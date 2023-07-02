import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { userHistory } from '../../redux/actions/a.users';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, List, DialogActions, Button, Modal } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { Box, IconButton } from '@mui/material';
import HistoryItems from './HistoryItems';
import logo from '../../images/MarketsCenter.png'
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Detail from '../Card/Detail/Detail'
import style from './Style/HistoryItems.module.css'
import { SnackbarAlert } from "../Alert/success";
import { Snackbar } from "@material-ui/core";
import { delAlert } from "../../redux/actions/a.alert";

function UserProfile() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);
  const alert = useSelector(state => state.alert)
  const { oneUser, currentUser } = useAuth();
  const [openMore, setOpenMore] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [oneProduct, setOneProduct] = useState({ name: "", price: 0, image: "", description: "", stock: "", category: "", id: "", rating: "", numReviews: "", reviews: [] });
  // const [delMsg, setDelMsg] = useState('');
  // const [openDelete, setOpenDelete] = useState(false);
  const [detail, setDetail] = useState("");
  function handleOpenMore(items) {
    setDetail(items.products)
    setOpenMore(true)
  }
  const handleCloseMore = () => setOpenMore(false);
  const handleCloseProd = () => setOpenProd(false);
  function handleOpenDetail(product) {
    setOneProduct(product)
    setOpenProd(true)
  }

  function handleClose() {
    dispatch(delAlert())
  }
  // function handleOpenCancel(item){
  //   if(item.status === 'Pendiente') {
  //     setDelMsg('Su orden será cancelada. Recibirá un aviso por mail')
  //   } else if (item.status === 'Aceptada') {
  //     setDelMsg('Su orden ya fue aceptada')
  //   } else {
  //     setDelMsg('algo para mostrar')
  //   }
  //   setOpenDelete(true)
  // }
  // const handleCloseCancel = () => setOpenDelete(false);

  useEffect(() => {
    dispatch(userHistory(oneUser._id, currentUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, oneUser._id]);
  return (
    <div>
      <Container maxWidth="md" className={style.containerHistory}>
        <Typography
          sx={{ mt: 4, mb: 2, display: "block" }}
          variant="h4"
          component="div"
        >
          Historial de Compras
        </Typography>
         <List sx={{ display: "block" }} dense={false}>
        {history.length>0 ? (
            <>{history.map((item) => <HistoryItems
                handleOpenMore={handleOpenMore}
                key={item._id}
                item={item}
              />
            )}</>
          ): (
            <Typography
              sx={{ mt: 4, mb: 2, display: "block" }}
              variant="h4"
              component="div"
              color="secondary"
            >
              Historial de compras vacío
            </Typography>
          ) }
        </List>
      </Container>

      <Dialog
        open={openMore}
        onClose={handleCloseMore}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ minwidth: "500px" }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="alert-dialog-title"
        >
          <img src={logo} alt="" style={{ padding: "10px", width: "40px" }} />
          {"Detalle de la compra"}
        </DialogTitle>
        <DialogContent>
          {detail.length > 0 &&
            detail.map((p) => (
              <DialogContentText
                key={p.productId._id}
                sx={{ display: "block" }}
                id="alert-dialog-description"
              >
                <Container className={style.containerItem}>
                  <Box
                    sx={{
                      height: "max-content",
                    }}
                  >
                    <img
                      src={p.productId?.image}
                      alt=""
                      style={{ padding: "10px", width: "50px" }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`${p.productId?.name}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`$ ${p.productId?.price}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`${p.quantity} u.`}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => handleOpenDetail(p.productId)}
                      sx={{ padding: "20px" }}
                      edge="end"
                      aria-label="delete"
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                </Container>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMore} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openProd}
        onClose={handleCloseProd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.cardDetalle}>
          <Detail viewRev={true} name={oneProduct.name} price={oneProduct.price} image={oneProduct.image} description={oneProduct.description} stock={oneProduct.stock} category={oneProduct.category} id={oneProduct._id} rating={oneProduct.rating} numReviews={oneProduct.numReviews} reviews={oneProduct.reviews} onClose={handleCloseProd} />
        </Box>
      </Modal>
      <Snackbar open={!!alert} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
        <SnackbarAlert onClose={handleClose} color='primary' variant='filled' severity='success'>
          {alert}
        </SnackbarAlert>
      </Snackbar>
    </div>
  );
}
export default UserProfile;
