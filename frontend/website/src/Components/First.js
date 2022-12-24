import React from 'react';
import { Typography, Grid, Container, CssBaseline, Box, Card, CardContent, CardHeader, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
// import { useNavigate } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { DeliveryDiningOutlined } from '@mui/icons-material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function First() {
    const [expandedId, setExpandedId] = useState(false);
    const [orders, setOrders] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [userData, setUserData] = useState([]);


    // <-- FOR DROPDOWN BUTTON IN TABLE -->
    // const [status, setStatus] = React.useState("");

    // const handleChange = (event) => {
    //     console.log(event.target.value)
    //     setStatus(event.target.value);
    // };


    // const ids = [{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }, { _id: "6" }];
    // const handleExpandClick = (i) => {
    //     setExpandedId(expandedId === i ? false : i);
    // };

    const getData = () => {
        axios.get("/total_persent")
            .then((resp) => {
                console.log("data", resp.data)
                setUserData(resp.data);
                console.log(userData);
                setOrders(resp.data.length)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    const getAbsentData = () => {
        axios.get("/total_absent")
            .then((resp) => {
                setRevenue(resp.data.length)

            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getAbsentData();
    }, []);


    // function createCard(taskName, allotedTo, status, description) 
    function createCard(Vegetable_Name, Category_Name, items_left, img) {
        return { Vegetable_Name, Category_Name, items_left, img };
    }

    const cards = [
        createCard('Organic Bananas', 'Fruits', 3, 'https://images.indianexpress.com/2022/02/GettyImages-spinach-1200.jpg', true),
        createCard('Carrot', 'Root Vegetables', 1, 'https://images.indianexpress.com/2022/02/GettyImages-spinach-1200.jpg'),
        createCard('palak', 'Green Vegetables', 0, 'https://images.indianexpress.com/2022/02/GettyImages-spinach-1200.jpg'),
        createCard('palak', 'Green Vegetables', 0, 'https://images.indianexpress.com/2022/02/GettyImages-spinach-1200.jpg'),
        createCard('palak', 'Green Vegetables', 0, 'https://images.indianexpress.com/2022/02/GettyImages-spinach-1200.jpg'),

    ]
    function createData(Order_Id, Customer_Name, Email, Mobile, Status) {
        return { Order_Id, Customer_Name, Email, Mobile, Status }
    }
    const data = [
        createData('#0', 'Abhay', 'Abhay@gmail.com', 9876543210, 'Delivered'),
        createData('#1', 'Vaibhav', 'Vaibhav@gmail.com', 7529834755, 'Pending'),
        createData('#2', 'Vartika', 'Vartika@gmail.com', 7588373262, 'Dispatched'),
        createData('#3', 'Vansh', 'Vansh@gmail.com', 7584373262, 'Cancelled'),
        createData('#3', 'Vansh', 'Vansh@gmail.com', 7584373262, 'Delivered'),
        createData('#3', 'Vansh', 'Vansh@gmail.com', 7584373262, 'Delivered')

    ]
    const handlePersent = () => {
        axios.get("/total_persent")
            .then((resp) => {
                setUserData(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleAbsent = () => {
        axios.get('/total_absent')
            .then((resp) => {
                setUserData(resp.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }




    const mdTheme = createTheme();
    return (
        <>
            <Box className='d-flex align-items-center justify-content-between card-header' sx={{ bgcolor: '#53B175' }}>
                <Typography
                    component="h1"
                    variant="h6"
                    color="#fff"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

            </Box>
            <ThemeProvider theme={mdTheme}>
                <CssBaseline />
                <Container sx={{ mt: 2.8, mb: 2.8 }}>

                    <Grid container spacing={3} >
                        <Grid item xs={12} md={8} lg={7}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card onClick={handlePersent} sx={{
                                        height: 200, cursor: 'pointer'
                                    }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">Total Orders</Typography>
                                            }
                                            border="1px solid black"
                                            sx={{ bgcolor: "#53B175", height: 55, color: '#fff' }}
                                            align="center"
                                        />
                                        <CardContent
                                            className='d-flex-row'
                                        >
                                            <Box className='item1 text-center '
                                                sx={{ bgcolor: "#53B175", mx: 1.5, borderRadius: 1 }}
                                            >
                                                <Typography sx={{ color: '#fff' }} variant='h4'>
                                                    {orders}
                                                </Typography>
                                            </Box>
                                            <Box className='item2 text-center'
                                                sx={{ bgcolor: "#53B175", mx: 1.5, borderRadius: 1 }}
                                            >
                                                <ShoppingCartIcon sx={{ color: '#fff' }} fontSize="large" />
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card onClick={handleAbsent} sx={{
                                        height: 200, cursor: 'pointer'
                                    }}>
                                        <CardHeader
                                            title={
                                                <Typography variant="h6">Revenue</Typography>
                                            }
                                            sx={{ bgcolor: "#53B175", color: "#fff", height: 55 }}
                                            align="center"

                                        />
                                        <CardContent
                                            className='d-flex-row'
                                        >
                                            <Box
                                                className='item1 text-center'
                                                sx={{ bgcolor: "#53B175", mx: 1.5, borderRadius: 1 }}
                                            >
                                                <Typography sx={{ color: '#fff' }} variant='h4'>
                                                    {revenue}
                                                </Typography>
                                            </Box>
                                            <Box
                                                className='item2 text-center'
                                                sx={{ bgcolor: "#53B175", mx: 1.5, borderRadius: 1 }}
                                            >
                                                <CurrencyRupeeIcon sx={{ color: '#fff' }} fontSize="large" />
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} sx={{ mt: 1 }}>
                                    <TableContainer component={Paper} sx={{ height: 330 }}>
                                        <Table>
                                            <TableHead sx={{ bgcolor: '#53B175' }}>
                                                <TableRow>
                                                    <TableCell sx={{ color: '#fff', fontSize: 16 }}>Order id</TableCell>
                                                    <TableCell sx={{ color: '#fff', fontSize: 16 }}>Customer Name</TableCell>

                                                    <TableCell sx={{ color: '#fff', fontSize: 16 }} align="left">Email</TableCell>
                                                    <TableCell sx={{ color: '#fff', fontSize: 16 }} align="left">Phone No</TableCell>
                                                    <TableCell sx={{ color: '#fff', fontSize: 16 }} align="left">Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.map((userData) => (
                                                    <TableRow
                                                        key={userData.Email}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {userData.Order_Id}
                                                        </TableCell>

                                                        <TableCell align="left">{userData.Customer_Name}</TableCell>
                                                        <TableCell align="left">{userData.Email}</TableCell>
                                                        <TableCell align="left">{userData.Mobile}</TableCell>
                                                        <>
                                                            {
                                                                userData.Status === "Delivered"
                                                                    ? <TableCell sx={{ fontSize: 16 }} align="left" sx={{ color: 'green' }}>{userData.Status}</TableCell>
                                                                    : userData.Status === "Cancelled"
                                                                        ? <TableCell sx={{ fontSize: 16 }} align="left" sx={{ color: '#Ea3a3a' }}>{userData.Status}</TableCell>
                                                                        : userData.Status === "Dispatched"
                                                                            ? <TableCell sx={{ fontSize: 16 }} align="left" sx={{ color: '#2596be' }}>{userData.Status}</TableCell>
                                                                            : <TableCell sx={{ fontSize: 16 }} align="left" sx={{ color: 'orange' }}>{userData.Status}</TableCell>
                                                            }
                                                        </>

                                                        {/* // <TableCell sx={{fontSize: 16}} align="left" sx={{color: 'green'}}>{userData.Status}</TableCell> */}


                                                        {/* // <-- FOR DROPDOWN BUTTON --> */}
                                                        {/* <TableCell sx={{ fontSize: 16 }} align="left">
                                                            <Box sx={{ minWidth: 120 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={userData.Status}
                                                                        label="Status"
                                                                        onChange={handleChange}
                                                                    >
                                                                        <MenuItem value={"Delivered"} sx={{color: "green"}}>Delivered</MenuItem>
                                                                        <MenuItem value={"Cancelled"} >Cancelled</MenuItem>
                                                                        <MenuItem value={"Dispatched"}>Dispatched</MenuItem>
                                                                        <MenuItem value={"Pending"}>Pending</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </TableCell> */}


                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={5}>
                            <Card >
                                <CardHeader

                                    title={
                                        <Typography variant="h6">Stock Alert</Typography>
                                    }
                                    border="1px solid black"
                                    sx={{ bgcolor: "#53B175", color: "#fff", height: 55 }}
                                    align="center"
                                />
                                <CardContent className='Scroll-bar'
                                >
                                    {cards.map((card, i) => (
                                        <Card sx={{ mt: 2, bgcolor: '#f5f5f5' }} key={card.taskName}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" src={card.img}>
                                                    </Avatar>
                                                }
                                                action={
                                                    // <ExpandMore

                                                    //     aria-expanded={expandedId === i}
                                                    //     aria-label="show more"
                                                    //     onClick={() => { handleExpandClick(i) }}
                                                    // >
                                                    //     <ExpandMoreIcon />
                                                    // </ExpandMore>
                                                    <>
                                                        {(() => {
                                                            if (card.items_left < 1) {
                                                                return (
                                                                    <Typography variant="h7" sx={{ color: "gray" }} gutterBottom>Out of Stock</Typography>
                                                                )
                                                            }

                                                            return (<Typography variant="h7" sx={{ color: "gray" }} gutterBottom>only {card.items_left} kg left</Typography>);
                                                        })()}
                                                    </>

                                                }
                                                title={
                                                    <Typography variant="subtitle2" sx={{ fontSize: 18 }} gutterBottom  >
                                                        {card.Vegetable_Name}
                                                    </Typography>
                                                }
                                                subheader={
                                                    <Typography sx={{ fontSize: 16 }} gutterBottom  >
                                                        Category : {card.Category_Name}
                                                    </Typography>
                                                }
                                            />
                                            {/* <Collapse in={expandedId === i} timeout="auto" unmountOnExit >
                                                <CardContent>
                                                    <Typography variant='h6' component='div'>Description:-</Typography>
                                                    <Typography variant='body' >
                                                        {card.description}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse> */}
                                        </Card>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </ThemeProvider >
        </>
    )
}
