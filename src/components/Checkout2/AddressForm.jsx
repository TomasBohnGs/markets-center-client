import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Button } from '@mui/material';
import AddressInput from './AddressInput'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form';
import { payment } from '../../redux/actions/a.order'

export default function AddressForm({ next }) {
  const dispatch = useDispatch()
  const methods = useForm()
  
  const user = useSelector(state => state.oneUser)
  const [firtName, lastName ] = user.name.split(' ')
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
          dispatch(payment(data))
          next()
        })}>
          <Grid container spacing={1}>
            <AddressInput required name="firtName" label="Firstname" value={firtName} />
            <AddressInput required name="lastName" label="Lastname" value={lastName} />
            <AddressInput required name="address" label="Address" value={user.address}/>
            <AddressInput required name="city" label="City" />
            <AddressInput required name="country" label="Country" />
            <AddressInput required name="state" label="State/Province/Region" />
            <AddressInput required name="postalCode" label="Postal Code" />
            <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </Grid>
          </Grid>   
        </form>

       {/*  <Grid container spacing={3}>
         
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
              label="Use esta dirección para detalles de pago"
            />
          </Grid>
        </Grid> */}
      </FormProvider>
    </>
  );
}