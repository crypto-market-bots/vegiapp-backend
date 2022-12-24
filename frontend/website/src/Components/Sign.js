import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ai from "../Img/ai1.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

export default function Sign() 
{
    let x = "";
    const [isRemember, setIsRemember] = useState(false)
    const initialValues = { email: '', password: '' }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const isRememberMe = (e) => {
        if (e.target.checked) {
            setIsRemember(true)
        }
        else {
            setIsRemember(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        // const data = new FormData(e.currentTarget);
        // console.dir(data)
        axios.post("user/loginEmail",formValues)
            .then((resp) => {
                console.log(resp);
                if (resp.data.success && isRemember) {
                    x = resp.data.token;
                    localStorage.setItem('token', x);
                    localStorage.setItem('remember', true)
                    sessionStorage.setItem('token', x);
                    navigate('/')
                    return true

                }

                else if (resp.data.success && !isRemember) {
                    x = resp.data.token;
                    localStorage.setItem('token', x)
                    localStorage.setItem('remember', false)
                    sessionStorage.setItem('token', x)
                    navigate('/')
                    return true
                }

                else {
                    alert(resp.data.error)
                }
            })
            .catch((error) => {
                alert(error.response.data.message);
            });

    };

    const navigate = useNavigate();
    useEffect(() => {
        let value = localStorage.getItem('token');
        let remeber = localStorage.getItem('remember')
        if (value && remeber) {
            navigate('/')
        }

    }, [])

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Email is not valid!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };


    return (

        <ThemeProvider theme={theme}>
            {/* <Box sx={{ mt: 4, mx: 4 }}>
                <Avatar variant="square" sx={{ height: 40, width: 40 }} alt="logo" src={aiLogo} />
            </Box>  */}
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={false}
                    lg={7}
                    sx={{
                        backgroundImage: `url(${ai})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}

                >
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formValues.password}
                                onChange={handleChange}
                                error={formErrors.password}
                                helperText={formErrors.password}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                value={isRemember}
                                onChange={isRememberMe}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color= "success"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgot_password" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>

    );
}


