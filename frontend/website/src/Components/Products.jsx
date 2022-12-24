import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CssBaseline, Grid, Card, CardContent, Container, CardHeader, Avatar, TableBody, Table, TableRow, TableCell, Button, CardActions } from '@mui/material';
import { blue } from '@mui/material/colors'
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appleImg from '../veg-all-over-Icons/icons8-apple-90.png';
import CircleIcon from '@mui/icons-material/Circle';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating';


const theme = createTheme({
    palette: {
        custom: {
            main: '#53B175',
            green: '#56B378',
            light_green: '#0dc44f7d'
        }
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [alignment, setAlignment] = React.useState('left');
    const [structure, setStructure] = React.useState('folder');
    const [age, setAge] = React.useState('');
    const navigate = useNavigate();

    const handleFolder = () => {
        setStructure('folder')
    }

    const handleList = () => {
        setStructure('list')

    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    
    const handleEdit = () => {
        navigate('editproduct');
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleAddItem = (event) => {
        navigate("/new_user");
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    function createCard(img, Product_Name, Price, InStock, Ratingval) {
        return { img, Product_Name, Price, InStock, Ratingval };
    }

    const cards = [
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true),
        createCard('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300, 10,2.5, true)
    ]

    function createList(img, Product_Name, Price) {
        return { img, Product_Name, Price};
    }

    const lists = [
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
        createList('https://media.istockphoto.com/id/1045495508/vector/red-apple-illustration-icon-vector.jpg?s=612x612&w=0&k=20&c=miHEE4W4VlC1D6VNFRe69v7WIvHiiMWMqG68sCjpT3E=', 'Apple', 300),
    ]

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {/* <AppBar position="static"> */}
                <AppBar position="static" elevation={0} sx={{ bgcolor: 'rgba(0,0,0,0)' }}>
                    <Toolbar>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                            sx={{ marginRight: '100px' }}
                        >
                            <ToggleButton value="left" aria-label="left aligned" sx={{"&:click":{bgcolor: "blue"} }} onClick={handleFolder}>
                                <SvgIcon width="100" height="100"viewBox="0 0 30 30">
                                    <path d="M 21.523438 0.00390625 C 20.285437 0.16290625 17.204 0.92909375 17 4.6210938 C 16.989 4.8300938 17.199359 5.0140469 17.443359 4.9980469 C 21.135359 4.7570469 21.857047 1.5744844 21.998047 0.39648438 C 22.026047 0.16248437 21.794438 -0.03109375 21.523438 0.00390625 z M 11.990234 0.9921875 A 1.0001 1.0001 0 0 0 11.445312 2.8320312 C 11.445312 2.8320312 13.451299 4.1471397 13.90625 6.8847656 C 12.9165 6.3519757 11.815183 6 10.599609 6 C 6.4076424 6 3 9.4915031 3 13.736328 C 3 17.379423 4.7100541 20.639098 6.7167969 23.007812 C 7.7201683 24.19217 8.8011656 25.158493 9.8320312 25.849609 C 10.862897 26.540726 11.805999 27 12.800781 27 C 13.617792 27 14.203672 26.654357 14.707031 26.371094 C 14.873432 26.277454 14.869386 26.267084 15 26.183594 C 15.130614 26.267084 15.126568 26.277454 15.292969 26.371094 C 15.796328 26.654357 16.382208 27 17.199219 27 C 18.117731 27 19.070856 26.64229 20.109375 26.042969 C 21.147894 25.443648 22.24549 24.57731 23.261719 23.453125 C 25.294176 21.204754 27 17.894967 27 13.736328 C 27 9.4915031 23.592358 6 19.400391 6 C 18.118316 6 16.960183 6.3856613 15.929688 6.96875 C 15.463856 3.1475753 12.554687 1.1679688 12.554688 1.1679688 A 1.0001 1.0001 0 0 0 11.990234 0.9921875 z M 19.400391 8 C 22.484423 8 25 10.555153 25 13.736328 C 25 17.35069 23.53334 20.170949 21.779297 22.111328 C 20.902275 23.081518 19.952872 23.824899 19.111328 24.310547 C 18.269785 24.796195 17.507707 25 17.199219 25 C 17.17023 25 16.658579 24.845643 16.273438 24.628906 C 15.888296 24.41217 15.59375 24.195312 15.59375 24.195312 L 15 23.755859 L 15 10.054688 L 15.658203 9.4804688 C 16.689445 8.5788937 17.980652 8 19.400391 8 z M 18 14 C 17.91925 14 17.837938 14.038688 17.773438 14.117188 C 17.451438 14.509187 17 15.216 17 16 C 17 16.784 17.451438 17.490813 17.773438 17.882812 C 17.902438 18.039813 18.097562 18.039812 18.226562 17.882812 C 18.484562 17.569812 19 16.863 19 16 C 19 15.137 18.548562 14.509187 18.226562 14.117188 C 18.162062 14.038687 18.08075 14 18 14 z" />
                                </SvgIcon>
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered" onClick={handleList}>
                                 <SvgIcon width="100" height="100"viewBox="0 0 30 30">
                                    <path d="M 6 5 A 2 2 0 0 0 4 7 A 2 2 0 0 0 6 9 A 2 2 0 0 0 8 7 A 2 2 0 0 0 6 5 z M 12 6 A 1.0001 1.0001 0 1 0 12 8 L 25 8 A 1.0001 1.0001 0 1 0 25 6 L 12 6 z M 6 13 A 2 2 0 0 0 4 15 A 2 2 0 0 0 6 17 A 2 2 0 0 0 8 15 A 2 2 0 0 0 6 13 z M 12 14 A 1.0001 1.0001 0 1 0 12 16 L 25 16 A 1.0001 1.0001 0 1 0 25 14 L 12 14 z M 6 21 A 2 2 0 0 0 4 23 A 2 2 0 0 0 6 25 A 2 2 0 0 0 8 23 A 2 2 0 0 0 6 21 z M 12 22 A 1.0001 1.0001 0 1 0 12 24 L 25 24 A 1.0001 1.0001 0 1 0 25 22 L 12 22 z" />
                                </SvgIcon>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Sort BY"
                            >
                                {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}
                                <MenuItem value={10}>Name</MenuItem>
                                <MenuItem value={20}>Time</MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">All</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Age"
                            >
                                {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}
                                <MenuItem value={10}>Vegetables</MenuItem>
                                <MenuItem value={20}>Fruits</MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>

                        <Box sx={{ flexGrow: 1 }} />
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ color: 'rgba(0,0,0,0.6)' }} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                sx={{ color: 'gray', borderBottom: '1px solid gray' }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>

            {
                structure === 'folder' ?
        
                    <Container maxWidth="lg" sx={{ mt: 1, mb: 3 }}>
                        <Grid container spacing={3} >

                            <Grid item xs={12} md={4} lg={3} key='1' >
                                <Card className='Card' onClick={handleAddItem} sx={{ mt: 10, borderRadius: 5,height: 200,display:'flex',justifyContent:'center', alignItems:'center'}} id='1' >   
                                    <AddIcon sx={{ width: 150, height: 150, color: 'primary.main' }} />
                                </Card>
                            </Grid>


                            {cards.map((card, i) => (
                                <Grid item xs={12} md={4} lg={3} key='1' >
                                    <Card className='Card' sx={{ mt: 1, borderRadius: 5 }} id='1' >
                                            <CardContent className='d-flex-head'>
                                                <Badge
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={<CircleIcon sx={{ backgroundColor: theme.palette.custom.main, color: theme.palette.custom.main, border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }}>
                                                    </CircleIcon>}

                                                >
                                                    <Avatar src={card.img} className='pic' sx={{ width: 120, height: 120, bgcolor: 'EEEEEE'}}>
                                                    </Avatar>
                                                </Badge>


                                            </CardContent><CardContent sx={{ bgcolor: '#fff' }} className='d-flex-head text-center'>
                                                    <Box className='text-center'>
                                                        <Typography variant='h6'>{card.Product_Name}</Typography>
                                                        {/* <Typography variant='h6'>{userData.Name}</Typography> */}
                                                    </Box>
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow>
                                                                <td>Price: {card.Price}</td>
                                                                {/* <td>{userData.Designation}</td> */}
                                                            </TableRow>
                                                            <TableRow>
                                                                <td>In Stock: {card.InStock} Kg</td>
                                                                {/* <td>{userData.Designation}</td> */}
                                                            </TableRow>
                                                        </TableBody>

                                                    </Table>
                                                    <Rating name="half-rating-read" defaultValue={card.Ratingval} precision={0.5} readOnly />

                                                </CardContent><CardActions className='button'>
                                                    {/* <Button size='small' clicked={clicked === i} onClick={() => { handleNew(i) }} fullWidth>See All</Button> */}
                                                    <Button size='small' onClick={handleEdit} sx={{ color: theme.palette.custom.green, borderRadius: 5, '&:hover': { background: '#0dc44f36' } }} fullWidth>Edit</Button>
                                                </CardActions>
                                        
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Container>


                    : <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                        <Grid container spacing={3}  >
                            <Grid item xs={12} md={4} lg={3} key='1' >
                                <Card className='Card' onClick={handleAddItem} sx={{ mt: 2, borderRadius: 5,height: 95,display:'flex',justifyContent:'center', alignItems:'center'}} id='1' >   
                                    <AddIcon sx={{ width: 80, height: 80, color: 'primary.main' }} />
                                </Card>
                            </Grid>
                            {lists.map((list, i) => (
                                <Grid item xs={12} md={4} lg={3} key='1' >
                                    <Card sx={{ mt: 2, bgcolor: '#fff', borderRadius: 3 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={list.img} className='pic' sx={{bgcolor:'#EEEEEE'}}>
                                                </Avatar>
                                            }

                                            title={
                                                <Typography variant="subtitle2" sx={{ fontSize: 18 }} gutterBottom  >
                                                    {list.Product_Name}
                                                </Typography>
                                            }
                                            subheader={
                                                <Typography sx={{ fontSize: 16 }} gutterBottom  >
                                                    Price: {list.Price}
                                                </Typography>
                                            }
                                        />

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
            }
        </>
    );
}
