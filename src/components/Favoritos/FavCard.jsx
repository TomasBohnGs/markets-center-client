import React, { useState } from 'react'
import { ListItemIcon, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Button, Box, Modal } from '@mui/material';
import Style from './FavCard.module.css';
import Favorite from '@mui/icons-material/Favorite';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Detail from '../Card/Detail/Detail'
import style from './FavCard.module.css'

function FavCard({ stock, price, name, description, category, numReviews, image, rating, id, delF, reviews }) {
  const [detail, setDetail] = useState(false)
  function handleCloseDet() {
    setDetail(false)
  }
  function handleOpen() {
    setDetail(true)
  }
  return (
    <div >
      <ListItem alignItems="flex-start">
        <div className={Style.image}>
          <ListItemAvatar>
            <Avatar alt={name} src={image} />
          </ListItemAvatar>
        </div>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {rating.toFixed(2)} <i className='fa fa-star' />
              </Typography>
              {` — ${description}`}
            </React.Fragment>
          }
        />
        <ListItemIcon>
          <Button>
            <MoreHoriz color='primary' onClick={() => handleOpen()} />
          </Button>
        </ListItemIcon>
        <ListItemIcon>
          <Button>
            <Favorite color='primary' onClick={() => delF(id)} />
          </Button>
        </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
      <Modal
        open={detail}
        onClose={handleCloseDet}
      >
        <Box className={style.cardDetalle}>
          <Detail viewRev={false} name={name} price={price} image={image} description={description} stock={stock} category={category} id={id} rating={rating} numReviews={numReviews} reviews={reviews} onClose={handleCloseDet}/>
        </Box>
      </Modal>
    </div>
  )
}

export default FavCard