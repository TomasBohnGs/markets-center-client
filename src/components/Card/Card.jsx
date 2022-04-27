import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import s from './Card.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Detail from './Detail/Detail'
import { addOrderCar } from '../../redux/actions/a.order.js'
import Tooltip from '@mui/material/Tooltip';
import useLocalStorage from '../../pages/Carrito/useLocalStorage.js';
import accounting from 'accounting'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function Card({ name, price, image, description, stock, category, id, rating, numReviews }) { //deberia recibir props para renderizar segun los productos

    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tooltip, setTooltip] = useState(false);

    const dispatch = useDispatch();
    const items = useSelector((state) => state.addOrdercar);
    const [product, setProduct] = useLocalStorage("products", '');

    function moreInfo(e) {
        setHover(true)
    }
    function lessInfo(e) {
        setHover(false)
    }

    const findItem = items.find((f) => f.id === id)

    function addToCar(id, price, name, image) {
        const obj = { id, name, price, image, quanty: 1, amount: price }
        if (findItem) {
            return setTooltip(true)
        }
        dispatch(addOrderCar(obj))
    }

    useEffect(() => {
        return items.length? setProduct(items) : product
    }, [items])

    return (
        <div onMouseEnter={moreInfo} onMouseLeave={lessInfo} className={s.container}>
            <div className={s.img}>
                {stock > 0 ? <img src={image} width="200px" height="200px" alt="producto" /> :
                    <img src={image} width="200px" height="200px" alt="producto" className={s.sinStock} />}
            </div>
            <div className={s.infoContainer}>
                <Typography variant="h6" >
                    {name}
                </Typography>
                <div className={s.priceAndButton}>
                    {hover ? <div className={s.masinfo}>
                        <Button variant="outlined" size="small" color="info" onClick={handleOpen} >más info</Button>
                    </div> :
                        <Typography variant="subtitle1" className={s.price}>
                            {accounting.formatMoney(price, '$')}
                        </Typography>}
                    <div className={s.icons}>
                        {stock > 0 ? <IconButton color="primary" size="small" onClick={() => {
                            addToCar(id, price, name, image)
                        }} >
                            <Tooltip title={!tooltip ? "Add" : "Added to cart"} arrow placement="top">
                                <AddShoppingCartIcon fontSize="medium" variant="contained" />
                            </Tooltip>
                        </IconButton> :
                            <IconButton size="small" disabled >
                                <AddShoppingCartIcon fontSize="medium" variant="contained" />
                            </IconButton>

                        }
                        {stock > 0 ? <IconButton color="info" size="small">

                            <DeliveryDiningIcon fontSize="" />
                        </IconButton> :
                            <IconButton color="disable" size="small">
                                <DeliveryDiningIcon fontSize="" />
                            </IconButton>
                        }
                    </div>
                </div>
            </div>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Detail name={name} price={price} image={image} stock={stock} description={description} category={category} id={id} rating={rating} numReviews={numReviews} />
                    </Box>
                </Modal>
            </div>
        </div>


    )
}