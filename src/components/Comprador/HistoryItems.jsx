import React from "react";
import { Box, Container, Avatar, IconButton, Typography } from "@mui/material";
import { ShoppingBasket, Info } from "@mui/icons-material";
//import InfoIcon from '@mui/icons-material/Info';
import style from './Style/HistoryItems.module.css'


function HistoryItems({ item, handleOpenMore, handleOpenCancel }) {
  const fecha = `${item.createdAt[8]}${item.createdAt[9]}/${item.createdAt[5]}${item.createdAt[6]}/${item.createdAt[0]}${item.createdAt[1]}${item.createdAt[2]}${item.createdAt[3]}`
  return (
    <div>
      <Container className={style.container}>
        <Box
          sx={{
            height: "max-content",
          }}
        >
          <Avatar>
            <ShoppingBasket />
          </Avatar>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Fecha: ${fecha}`}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Monto: $ ${item.amount}`}
          </Typography>
          </Box>
          <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Estado: ${item.status}`}
          </Typography>
        </Box>
        <Box>
        <IconButton
              onClick={() => handleOpenMore(item)}
              sx={{ padding: "20px" }}
              edge="end"
              aria-label="delete"
            >
              <Info />
            </IconButton>
        </Box>
      </Container>
    </div>
  );
}


export default HistoryItems;
