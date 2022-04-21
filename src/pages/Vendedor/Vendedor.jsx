import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productBySeller, deleteProduct } from '../../redux/actions/a.products.js';
import { updateProduct, postProduct } from '../../redux/actions/a.seller.js'
import spinner from '../../spinner.gif'
// import { postProduct } from '../../../redux/actions/a.seller.js'

import { useAuth } from '../../context/AuthContext'

import NavBar from '../../components/NavBar/NavBar'
import DatosVendedor from '../../components/Vendedor/DatosVendedor/DatosVendedor'
import CardVendedor from '../../components/Vendedor/CardVendedor/CardVendedor'
import AddProduct from '../../components/Vendedor/AddProduct/AddProduct.jsx'
import { Container, Typography, Button } from '@mui/material'

export default function Vendedor(){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const { oneUser, currentUser } = useAuth()
    // Form Modal 
    const [prodId, setProdId] = useState(null)
    const [input, setInput] = useState({
        name: "",
        description: "",
        image: "",
        stock: "",
        category: [],
        price: "",
        userId: currentUser.uid
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setProdId(null)
        setInput({
            name: "",
            description: "",
            image: "",
            stock: "",
            category: [],
            price: "",
            userId: currentUser.uid
        })
        setOpen(false)
    }
    console.log(prodId)
    function handleSubmit(e){
        e.preventDefault();
        prodId === null ?
        dispatch(postProduct(input))
        : dispatch(updateProduct(input, prodId))
    }
    // Products by User
    useEffect(() => {
        dispatch(productBySeller(oneUser._id))
        setTimeout(() => {
            setLoading(false)
        }, 500);
    },[oneUser._id,dispatch])
    let products = useSelector(state => state.productsBySeller)
    //const [listProducts, setListProducts] = useState(products);
    //console.log(listProducts)
    // Solo se borra hasta que se recarga la pagina (No de la DB)
    const removeProduct = (id) => {
        dispatch(deleteProduct(id))
        dispatch(productBySeller(oneUser._id))
        return products = products.filter(product => product._id !== id)
    }
console.log('Input: ', input)
console.log('ProductId: ', prodId)
    return (
        <>
        <NavBar />
        <Container sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <DatosVendedor 
                        name={oneUser.name}
                        address={oneUser.address}
                        email={oneUser.email}
                        delivery={oneUser.delivery}
                        phone={oneUser.phone}
                        image={oneUser.image}
                        />
            <Container sx={{
                height: '500px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                borderRadius: '10px',
            }}>
                <Container sx={{
                    height: '70px',
                    margin: '5px 0',
                    display: 'flex',
                    borderBottom: '2px solid black',
                    alignItems: 'center',
                }}>
                    <Typography variant="h6">
                        TUS PRODUCTOS
                    </Typography>
                    <Button 
                        onClick={handleOpen}
                        variant="contained" 
                        color="info" 
                        sx={{
                            left: '760px',
                            fontWeight: '600',
                        }}
                    >
                        Agregar
                    </Button>
                    <AddProduct 
                        prodId={prodId}
                        input={input}
                        setInput={setInput}
                        open={open}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                    />
                </Container>
                <Container sx={{
                height: '335px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'auto',
                borderRadius: '10px'
            }}>
                {loading ? <img src={spinner} alt="" style={{width: '150px', height: 'max-content'}} /> : products.length ? products.map((producto, id) => <CardVendedor 
                                            key={id}
                                            id={producto._id}
                                            nombre={producto.name}
                                            image={producto.image}
                                            stock={producto.stock || "Sin Stock"}
                                            precio={producto.price}
                                            category={producto.category}
                                            description={producto.description}
                                            handleClose={handleClose}
                                            handleOpen={handleOpen}
                                            handleSubmit={handleSubmit}
                                            removeProduct={removeProduct}
                                            input={input}
                                            setInput={setInput}
                                            prodId={prodId}
                                            setProdId={setProdId}
                                            />) : <Typography variant='h5' sx={{margin: 'auto'}}>
                                                    NO HAY PRODUCTOS
                                                </Typography>}
                </Container>
            </Container>
        </Container>
        </>
    )
}