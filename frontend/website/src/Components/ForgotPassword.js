import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Forgot() {

    const initialValues = { email: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
  
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const data = new FormData(e.currentTarget);
        axios.post("/reset_password", data)
            .then((resp) => {
              if(resp.data.staus){
               console.log('success')
              }
             
                console.log(resp.data)
            })
            .catch((error) => {
                console.log(error);
            });

        
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Email is not valid!";
        }
        return errors;
    };
    
  return (
      <Container component="main"  sx={{ height: '100vh' }}>
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
            Forgot Password
          </Typography>
          <Typography component='body' variant='body'sx={{mt: 2}}>
            To request password reset link , please enter your email address in the given form
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
             margin="normal"
             fullWidth
             id="email"
             name="email"
             autoComplete="email"
             autoFocus
             value={formValues.email}
             onChange={handleChange}
             label="Email Address"
             error={formErrors.email}
             helperText={formErrors.email}
             
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Email
            </Button>
          </Box>
        </Box>
    
      </Container>
    
  );
        }