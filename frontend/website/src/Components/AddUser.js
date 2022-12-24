import React from 'react'
import { CssBaseline, Container, Typography, Grid, Card, CardHeader, CardContent, Button, Avatar, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'other',
    label: 'Other',
  },

];

export default function AddUser() {
  const initialValues = { name: '', mobile: '' ,rfid: '', email:'',qualification:'', designation:'', city:'', state:'', country:'', address:'',date:'' , dob:''}
  const [formValues, setFormValues] = useState(initialValues);
  const [currency, setCurrency] = useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleVChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} >
            <Card sx={{ mt: 2 }} >
              <CardHeader
                title={
                  <Typography>Add User</Typography>
                }

                sx={{ bgcolor: "primary.main", color: "#fff" }}
              />
              <CardContent sx={{ bgcolor: '#fff' }}>
                <Box component='form' >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                      <Avatar sx={{width: 150, height: 150}}></Avatar>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                      
                        margin="normal"
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        label="Name"
                        value={formValues.name}
                        onChange={handleVChange}
                      />
                      <TextField
                        margin="normal"
                        id="mobile"
                        name="mobile"
                        autoComplete="mobile"
                        autoFocus
                        label="Mobile No"
                        value={formValues.mobile}
                        onChange={handleVChange}
                      />
                    </Grid>

                    <Grid item sx={12} md={6} lg={4}>
                      <TextField
                     
                        margin="normal"
                        id="rfid"
                        name="rfid"
                        autoComplete="rfid"
                        autoFocus
                        label="RF ID"
                        value={formValues.rfid}
                        onChange={handleVChange}
                      />
                      <TextField
                        margin="normal"
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formValues.email}
                        onChange={handleVChange}
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>

                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        margin="normal"
                        type='date'
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formValues.dob}
                        onChange={handleVChange}
                        label="Date-Of-Birth"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                      
                        id="outlined-select-gender"
                        select
                        value={currency}
                        onChange={handleChange}
                        label="Select"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        margin="normal"
                        id="date"
                        name="date"
                        autoComplete="date"
                        autoFocus
                        value={formValues.date}
                        onChange={handleVChange}
                        label='Joining Date'
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type='date'
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        margin="normal"
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formValues.qualification}
                        onChange={handleVChange}
                        label="Qualification"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        margin="normal"
                        id="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formValues.designation}
                        onChange={handleVChange}
                        label="Designation"
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        margin="normal"
                        id="address1"
                        name="address1"
                        autoComplete="name"
                        autoFocus
                        value={formValues.address}
                        onChange={handleVChange}
                        label="Address"
                        fullWidth
                      />
                    </Grid>
      
                   
                    <Grid item xs={6} md={6} lg={3}>
                      <TextField
                        margin="normal"
                        id="city"
                        name="city"
                        autoComplete="city"
                        autoFocus
                        value={formValues.city}
                        onChange={handleVChange}
                        label="City"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={3}>
                      <TextField
                        margin="normal"
                        id="state"
                        name="state"
                        autoComplete="state"
                        autoFocus
                        value={formValues.state}
                        onChange={handleVChange}
                        label="State"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={3}>
                      <TextField
                        margin="normal"
                        id="country"
                        name="country"
                        autoComplete="name"
                        autoFocus
                        value={formValues.country}
                        onChange={handleVChange}
                        label="Country"
                      />
                    </Grid>
                    <Grid item xs={6} md={6} lg={3}>
                      <TextField
                        margin="normal"
                        id="zip"
                        name="zip"
                        autoComplete="zip"
                        autoFocus
                        value={formValues.zip}
                        onChange={handleVChange}
                        label="Zip Code"
                      />
                    </Grid>



                  </Grid>


                </Box>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
