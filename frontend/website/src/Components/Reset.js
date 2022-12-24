import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Reset() {
  

  const initialValues = { new: '', confirm: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data)

  };



  return (
    <Container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" >
          Password Reset
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="newpassword"
            name="newpassword"
            autoComplete="newpassword"
            autoFocus
            value={formValues.new}
            onChange={handleChange}
            label="New Password"


          />
          <TextField
            margin="normal"
            fullWidth
            id="confirmpassword"
            name="confirmpassword"
            autoComplete="confirmpassword"
            autoFocus
            value={formValues.confirm}
            onChange={handleChange}
            label="Confirm Password"


          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>

    </Container>

  );
}