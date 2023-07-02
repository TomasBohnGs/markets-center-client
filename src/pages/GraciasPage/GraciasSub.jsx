import React, { useState, useEffect } from 'react';
import s from './GraciasPage.module.css'
import Typography from '@mui/material/Typography';
import Mc from '../../images/MarketsCenter.png';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import {UpdateOrder} from '../../redux/actions/a.order';


function ComponenteGraciasSub() {
    const [checked,setChecked] = useState(false);
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    const newOrder = useSelector(state=> state.newOrder)
    useEffect(()=>{
        dispatch(UpdateOrder(newOrder, "Aprobada", currentUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    setTimeout(function(){
        setChecked(true)
    },2000)


    return (
        <div className={s.supremeContainer}>
            <div className={s.container}>
            <div className={s.containerCheck}>
            <input type="checkbox" id="check" checked={checked} className={s.input}/>
                <label className={s.label} for="check">
                    <div className={s.checkIcon}></div>
                </label>
            </div>    
                {checked?<div><div>
                    <Typography variant="h3" className={s.title}>¡Gracias por unirte al equipo de Market Center!</Typography>
                    <Typography variant="h6" className={s.text}>
                        Ya puedes comenzar a publicar tus productos
                    </Typography>
                    </div>
                    <div className={s.containerButton} style={{marginTop: '160px'}}>
                    <div className={s.button}><Button variant="contained" color="buttonGracias" size="small" disableElevation href="/Profile">Ir a mi Perfil</Button></div>
                    <Typography variant="body2" className={s.textMarket}>
                        Equipo de MarketsCenter<img src={Mc} width="25px" alt="mc" className={s.imgCarritoThanks}/>
                    </Typography>
                </div>
                </div>:""}


            </div>
        </div>
    );
}

export default ComponenteGraciasSub;