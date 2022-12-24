import React from 'react';
import { CssBaseline, Grid, Card, CardContent, Container, Avatar, TableBody, Table, TableRow, CardActions, Box, Button, Badge, Typography, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Employee from "../Ep_pic/employee1.png";
import CircleIcon from '@mui/icons-material/Circle';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryImg from '../Img/category.png';
import AllItems from '../Img/all_products.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const theme = createTheme({
  palette: {
    custom:{
        main: '#53B175',
        green: '#56B378',
        light_green: '#0dc44f7d'
      }
  },
});


export default function Inventory() 
{
    const [userData, setUserData] = useState([]);
    const [clicked, setClicked] = useState('');

    const navigate = useNavigate();

    const handleCategory = () => {
        navigate(`category`)
    }
    
    const handleAllProducts = () => {
        navigate(`products`)
    }
    // const handleNew = (i) => {
    //     setClicked(clicked === i ? -1 : i);
    //     let x = (userData[i].Employee_ID)
    //     navigate(`/userdetail/${x}`)
    // }

    // const ExpandMore = styled((props) => {
    //     const { expand, ...other } = props;
    //     return <IconButton {...other} />;
    //     })(({ theme, expand }) => ({
    //     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // }));

    // function RecipeReviewCard() {
    //     const [expanded, setExpanded] = React.useState(false);

    //     const handleExpandClick = () => {
    //         setExpanded(!expanded);
    // };
    

    const getData = () => {
        axios.get("/user_list")
            .then((resp) => {
                console.log("data", resp.data)
                setUserData(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Box className = 'd-flex align-items-center justify-content-between card-header' sx={{bgcolor: theme.palette.custom.main}}>
                <ArrowBackIcon onClick={()=> navigate(-1)} sx={{color : '#fff', marginRight: '10px'}}/>
                <Typography
                        component="h1"
                        variant="h6"
                        color="#fff"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                    Inventory Management
                </Typography>
            </Box> 
            <CssBaseline />

            {/* <Stack direction= "row">
                <Card sx={{ maxWidth: 300, margin: 5, borderRadius: 5 }}>
                    <CardMedia
                        component="img"
                        width ="10"
                        height="194"
                        image="https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg"
                        alt="Paella dish"
                    />
                    
                    <CardHeader
                        avatar={
                        // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        //   R
                        // </Avatar>
                        <ManageSearchIcon />
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Explore"
                        subheader="All Items"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                        <ExpandMore
                        // expand={expanded}
                        // onClick={handleExpandClick}
                        // aria-expanded={expanded}
                        // aria-label="show more"
                        >
                        <ChevronRightIcon />
                        </ExpandMore>
                    </CardActions>
                </Card>

                <Card sx={{ maxWidth: 300, margin: 5, borderRadius: 5 }}>
                    <CardMedia
                        component="img"
                        width ="10"
                        height="194"
                        image="https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg"
                        alt="Paella dish"
                    />
                    
                    <CardHeader
                        avatar={
                        // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        //   R
                        // </Avatar>
                        <ManageSearchIcon />
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Explore"
                        subheader="All Items"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                        <ShareIcon />
                        </IconButton>
                        <ExpandMore
                        // expand={expanded}
                        // onClick={handleExpandClick}
                        // aria-expanded={expanded}
                        // aria-label="show more"
                        >
                        <ChevronRightIcon />
                        </ExpandMore>
                    </CardActions>
                </Card>
            </Stack> */}





            {/* <ThemeProvider theme={mdTheme}> */}
                <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                    <Grid container spacing={3} >
                        {/* {userData.map((userData, i) => ( */}
                            <Grid item xs={12} md={4} lg={3} key= '1' >
                                <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            {/* <Grid item xs={12} md={4} lg={3} key={userData.Employee_ID} >
                                <Card className='Card' sx={{ mt: 1  }} id={userData.Employee_ID} > */}

                                    <CardContent className='d-flex-head' >
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                // <CircleIcon sx={userData.status == '1' ?
                                                //     { backgroundColor: '#117011', color: '#117011', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                                                //     : { backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                                                // } >
                                                <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                                </CircleIcon>
                                            }

                                        >
                                            {/* <Avatar src={`http://192.168.29.88:5000/${userData.Employee_Picture}`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}> */}
                                            <Avatar src={CategoryImg} className='pic' size={100} sx={{backgroundSize: 'contain', width: 120, height: 120,padding: '12px 10px 10px 18px' ,bgcolor:'#EEEEEE'}}>
                                            </Avatar>
                                        </Badge>


                                    </CardContent>

                                    <CardContent sx={{ bgcolor: '#fff' }} className='d-flex-head text-center'>
                                        <Box className='text-center'>
                                            <Typography variant='h6'>Category</Typography>
                                            {/* <Typography variant='h6'>{userData.Name}</Typography> */}
                                        </Box>
                                        <Table >
                                            <TableBody >
                                                <TableRow>
                                                    <td>Total Items: 6</td>
                                                    {/* <td>{userData.Designation}</td> */}
                                                </TableRow>
                                                {/* <TableRow>
                                                    <td>7837849288</td>
                                                    {/* <td>{userData.Mobile</td> */}
                                                {/* </TableRow>
                                                <TableRow> */}
                                                    {/* <td>Mohit@gmail.com</td> */}
                                                    {/* <td>{userData.Email}</td> */}
                                                {/* </TableRow> */} 
                                            </TableBody>

                                        </Table>

                                    </CardContent>
                                    <CardActions className='button'>
                                        {/* <Button size='small' clicked={clicked === i} onClick={() => { handleNew(i) }} fullWidth>Details</Button> */}
                                        <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}  onClick={() => { handleCategory() }} fullWidth>Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>


                            <Grid item xs={12} md={4} lg={3} key= '1' >
                                <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            {/* <Grid item xs={12} md={4} lg={3} key={userData.Employee_ID} >
                                <Card className='Card' sx={{ mt: 1  }} id={userData.Employee_ID} > */}

                                    <CardContent className='d-flex-head' >
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                // <CircleIcon sx={userData.status == '1' ?
                                                //     { backgroundColor: '#117011', color: '#117011', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                                                //     : { backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                                                // } >
                                                <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                                </CircleIcon>
                                            }

                                        >
                                            {/* <Avatar src={`http://192.168.29.88:5000/${userData.Employee_Picture}`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}> */}
                                            <Avatar src={AllItems} className='pic' size={100} sx={{backgroundSize: 'contain', width: 120, height: 120,padding: '15px' ,bgcolor:'#EEEEEE'}}>
                                            </Avatar>
                                        </Badge>


                                    </CardContent>

                                    <CardContent sx={{ bgcolor: '#fff' }} className='d-flex-head text-center'>
                                        <Box className='text-center'>
                                            <Typography variant='h6'>All Products</Typography>
                                            {/* <Typography variant='h6'>{userData.Name}</Typography> */}
                                        </Box>
                                        <Table >
                                            <TableBody >
                                                <TableRow>
                                                    <td>Total Items: 136</td>
                                                    {/* <td>{userData.Designation}</td> */}
                                                </TableRow>
                                                {/* <TableRow>
                                                    <td>7837849288</td>
                                                    {/* <td>{userData.Mobile</td> */}
                                                {/* </TableRow>
                                                <TableRow> */}
                                                    {/* <td>Mohit@gmail.com</td> */}
                                                    {/* <td>{userData.Email}</td> */}
                                                {/* </TableRow> */} 
                                            </TableBody>

                                        </Table>

                                    </CardContent>
                                    <CardActions className='button'>
                                        {/* <Button size='small' clicked={clicked === i} onClick={() => { handleNew(i) }} fullWidth>Details</Button> */}
                                        <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}  onClick={() => { handleAllProducts() }} fullWidth>Details</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        {/* ))} */}
                    </Grid>
                </Container>
           {/* </ThemeProvider > */}
        </>
    );
}