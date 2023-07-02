import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { ListItem, ListItemText, List, Divider} from '@mui/material';

import accounting from 'accounting'


export default function Review({ amount }) {
  const products = useSelector(state => state.addOrdercar.products)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products?.map((product) => (
          <ListItem key={product.productId._id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.productId.name}/>
            <Typography variant="body2">{accounting.formatMoney(product.productId.price, '$')}</Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
             {accounting.formatMoney(amount, '$')}
          </Typography>
        </ListItem>
      </List>
     {/*  <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}