import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import {ordenamientos, filterByPrice, resetFilterByPrice, filterBySellerAndCategories, idActiveCategory, ordenamientosFiltered, idActiveSeller} from '../../redux/actions/a.products'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import style from './Ordenamiento.module.css';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';



function Ordenamiento() {
    const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState('');
  const [selected, setSelected] = useState(0)
  const allCategories = useSelector(state => state.allCategories)
  const open = Boolean(anchorEl);
  const idSeller = useSelector(state => state.activeSeller);

  //  function handleChange2(event, newValue){
  //        setValue2(newValue);
  //    };

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    //-------
    // const dispatch = useDispatch();
    // const idSeller = useSelector(state => state.activeSeller);
    const filtered = useSelector(state => state.filteredByPrice);
    // const allCategories = useSelector(state => state.allCategories)
/*     const idCategory = useSelector(state => state.activeCategory); */
    const [order, setOrder] = React.useState('');
    const [categoria, setCategoria] = React.useState('')
    const [radio, setRadio] = React.useState('');

 
    const handleChange = (event) => {
        event.preventDefault();
        setOrder(event.target.value);
        if(filtered.length === 0){
            if(event.target.value !== '-'){
                dispatch(ordenamientos(event.target.value));
            }else{
                dispatch(filterBySellerAndCategories(idSeller,""))
            }
        }
        else{
            if(event.target.value !== '-'){
                dispatch(ordenamientosFiltered(event.target.value));
            }else{
                dispatch(filterBySellerAndCategories(idSeller,""))
            }
        }

        
    };
    const handleChangeCategory = (e, newValue) => {
        e.preventDefault()
        // let category = categories.length === 0 ? e.target.textContent : '-' + e.target.textContent
        // setCategories((prev) => prev + e.target.textContent);
        setCategoria(e.target.textContent);
        dispatch(idActiveCategory(e.target.textContent))
        if (idSeller) {
          dispatch(filterBySellerAndCategories(idSeller, e.target.textContent));
        } else {
          dispatch(filterBySellerAndCategories("", e.target.textContent));
          dispatch(idActiveSeller())
        }
      };

    const handleChangeRadio = (event) => {
      setRadio(event.target.value);
      dispatch(filterByPrice(event.target.value))
    };
    const handleReset = () => {
        dispatch(resetFilterByPrice())
        dispatch(filterBySellerAndCategories(idSeller,""))
        dispatch(idActiveCategory(''))
        setRadio('')
        setCategoria('')
        setOrder('')

    }
  
  
  
    return (
        <Container className={style.container}>
            <div className={style.divMenu}>
            <FormControl variant="standard" className={style.formcategory}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Categorías">
                            <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            >
                              <MenuIcon sx={anchorEl ? { width: 30, height: 30, color: 'red' } : { width: 30, height: 30, color: 'primary' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                         PaperProps={{
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            },
                        }} 
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                        {
                            allCategories?.map(element => {
                            return (<MenuItem key={element._id} onClick={handleChangeCategory} value={element.name}>{element.name}</MenuItem>)
                            })
                        }
                    </Menu>
            </FormControl>
            </div>
            <Box className={style.boxPrecio}>
            <FormControl>
            <FormLabel sx={{color: 'black'}}>Precio</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="precio"
                    value={radio}
                    onChange={handleChangeRadio}
                    row
                >
                    <FormControlLabel value="0-500" control={<Radio size="small"/>} label="$0-$5" />
                    <FormControlLabel value="500-1500" control={<Radio size="small"/>} label="$5-$15" />
                    <FormControlLabel value="1500-3000" control={<Radio size="small"/>} label="$15-$30" />
                    <FormControlLabel value=">3000" control={<Radio size="small"/>} label=">$30" />
                </RadioGroup>
            </FormControl>
            </Box>
            <FormControl variant="standard" className={style.form} >
                <InputLabel>Ordenar</InputLabel>
                <Select

                value={order}
                onChange={handleChange}
                label="Ordenar"
                >
                    <MenuItem value={'-'}>-</MenuItem>
                    <MenuItem value={'high'}>Mayor Precio</MenuItem>
                    <MenuItem value={'low'}>Menor Precio</MenuItem>
                    <MenuItem value={'a-z'}>A-Z</MenuItem>
                    <MenuItem value={'z-a'}>Z-A</MenuItem>
                </Select>
            </FormControl>
            <Button variant="outlined" size='small' sx={{marginTop: "20px", width: '100%' }} onClick={handleReset}>
                <CachedIcon />
            </Button>
        </Container>
    );
}

export default Ordenamiento;