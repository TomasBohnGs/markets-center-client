import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersBySeller } from '../../../redux/actions/a.seller.js'
import {updateDispatches} from '../../../redux/actions/a.order'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.js'
import ListItem from './ListItem.jsx'
import styleH from './HistoryHome.module.css';
import Loading from '../../Loading/Loading';
import {setAlert, delAlert} from '../../../redux/actions/a.alert';

import NavBar from '../../NavBar/NavBar.jsx'
import {Button, Typography, Snackbar} from '@mui/material'
import OrderDetail from './OrderDetail.jsx'
import {SnackbarAlert} from '../../Alert/success';

export default function HistoryHome(){

    // 
    const [openMore, setOpenMore] = useState(false);
    const [input, setInput] = useState('');
    const [alerta, setAlerta] = useState('');
    function handleOpenMore(items){
        setInput(items);
        setOpenMore(true)
    }


    const handleCloseMore = () => setOpenMore(false);
    // 
    const navigate = useNavigate()
    const {oneUser, currentUser} = useAuth()
    const history = useSelector(state => state.history)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ordersBySeller(oneUser._id, currentUser))
    }, [dispatch, oneUser._id, currentUser])

    async function handleDespachar(id) {
        await dispatch(updateDispatches({idOrder:id, idUser: currentUser.uid}, currentUser))
        setAlerta('Pedido listo para despachar')
        dispatch(setAlert('Pedido listo para despachar'))
    }

    function handleCloseAlert(){
        setAlerta('')
        dispatch(delAlert())
    }

    return (
        <div>
            <NavBar />
            <Button 
                        className={styleH.btn}
                        onClick={() => navigate('/Login')}
                        variant="contained" 
                        color="primary" 
                        /* sx={{
                            m: 2,
                            left: '1240px',
                            fontWeight: '600',
                        }} */
                    >
                        Volver
                    </Button>
            { loading? <Loading /> : history?.length<1 ? (<div className={styleH.nohay}><Typography
              sx={{ mt: 4, mb: 2, display: "block" }}
              variant="h4"
              component="div"
              color="secondary"
            >
              Historial de ventas vacío
            </Typography></div>) :
            (history.map( order => {
                return (
                    <div key={order._id}>
                        <ListItem key={order._id}  id={order._id} element={order} openMore={openMore} handleDespachar={handleDespachar} handleOpenMore={handleOpenMore} handleCloseMore={handleCloseMore}/>
                        {input && <OrderDetail input={input} openMore={openMore} handleOpenMore={handleOpenMore} handleCloseMore={handleCloseMore}/>}
                    </div>
                )
            }))
            }
                    <Snackbar open={!!alerta} autoHideDuration={1500} onClose={handleCloseAlert} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleCloseAlert} color='primary' variant='filled' severity='success'>
                    {alerta}
                </SnackbarAlert>
            </Snackbar>
        </div>
    )
}

