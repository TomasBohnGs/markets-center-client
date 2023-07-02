import React, { useState, useEffect } from "react";

import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";
import { Publish } from '@mui/icons-material/';


const Input = styled('input')({
    display: 'none',
});

export default function AddCategorie({open, handleClose, banObj, setBanObj, handleUserBan}) {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: 'row',
    };
    
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({
        name: "Error"
    })

    const handleChange = (e) => {
        setBanObj({
            ...banObj,
            reason: e.target.value
        });
        setError(Validation({
            ...banObj,
            [e.target.id]: e.target.value
        }))
    }

    const Validation = (input) => {
        let errorData = {
            name: "Error",
        }
        if (/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name) && input.name.length > 0) delete errorData.name;
        return errorData;
    }

    useEffect(()=>{
        Object.keys(error).length > 0 ? setDisabled( true ) : setDisabled( false )
    }, [error])
    
    return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{ ...style}} component="form">
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Motivo de baneo:
            </Typography>
                <TextField error={error.name ? true : false} id="name" label="Motivo" variant="standard" onChange={handleChange} value={banObj.reason} style={{ width: "300px", margin: "5px" }} />
            <Button 
                onClick={handleUserBan}
                disabled={disabled}
                variant="contained" 
                component="span" 
                style={{ width: "70%", margin: "5px" }}
                startIcon={<Publish />}
                >Banear</Button>
        </div>
        </Box>
    </Modal>
    );
}