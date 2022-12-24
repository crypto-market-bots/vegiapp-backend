import React from 'react'
import { CssBaseline, Grid, Card, CardContent, Container, CardHeader, Avatar, TableBody, Table, TableRow, TableCell, Typography, Box, Button, Badge, CardActions } from '@mui/material';
import { blue } from '@mui/material/colors'
import axios from 'axios';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Category() {
  const theme = createTheme({
    palette: {
      custom:{
          main: '#53B175',
          green: '#56B378',
          light_green: '#0dc44f7d'
        }
    },
  });
  // const [userData, setUserData] = useState([]);
  // const { Employee_ID } = useParams();
  // const getData = () => {
  //   axios.get(`/user_detail/${Employee_ID}`)

  //     .then((resp) => {
  //       console.log("data", resp.data)
  //       setUserData(resp.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // useEffect(() => {
  //   getData();
  //   console.log("PARAMS", Employee_ID);
  // }, []);
  const navigate = useNavigate();
  const addUser = () => {
    navigate('/new_user')
  }

  const data = [

    {
      name: "jan",
      "Active User": 4000,
    },
    {
      name: "feb",
      "Active User": 3000,
    },
    {
      name: "mar",
      "Active User": 2000,
    },
    {
      name: "June",
      "Active User": 5000,
    },
    {
      name: "July",
      "Active User": 4000,
    },
    {
      name: "aug",
      "Active User": 3000,
    },
    {
      name: "sept",
      "Active User": 4000,
    },

  ];

  return (
    <>
      <Box className='d-flex align-items-center justify-content-between card-header' sx={{ bgcolor: theme.palette.custom.main }}>
        <ArrowBackIcon onClick={()=> navigate(-1)} sx={{color : '#fff', marginRight: '10px'}}/>
        <Typography
          component="h1"
          variant="h6"
          color="#fff"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Category
        </Typography>
        <Button sx={{ color: '#fff' }} onClick={addUser}>Add user</Button>

      </Box>
      <CssBaseline />


      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
          <Grid container spacing={3} >
                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>


                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>


                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>



                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>



                    <Grid item xs={12} md={4} lg={3} key= '1' >
                        <Card className='Card' sx={{ mt: 1, borderRadius: 5  }} id='1' >
                            <CardContent className='d-flex-head' >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }} >
                                        </CircleIcon>
                                    }

                                >
                                    <Avatar src={`https://c4.wallpaperflare.com/wallpaper/682/1019/579/vegetables-dish-white-background-wallpaper-preview.jpg`} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
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
                                <Button size='small' sx={{color: theme.palette.custom.green, borderRadius: 5, '&:hover': {background: '#0dc44f36'}}}fullWidth>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
          </Grid>
   
      </Container>
    </>
  )
}



      {/* <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={3}>   */}
          {/* {userData.map((userData, idx) => ( */}
            {/* <Grid item xs={6} md={4} lg={4} key="1" >
              <Card className='Card1' sx={{ mt: 1 }}  >

                <CardContent className='d-flex-head' >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <CircleIcon sx={{ backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                      } >
                      {/* <CircleIcon sx={userData.status == '1' ? */}
                        {/* { backgroundColor: '#117011', color: '#117011', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                        : { backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                      } > */}
                      {/* </CircleIcon>
                    }

                  >
                    <Avatar src={""} alt='hello' className='pic' sx={{ width: 200, height: 200, bgcolor: blue[300] }}>
                    </Avatar>
                  </Badge>


                </CardContent>

                <CardContent sx={{ bgcolor: '#fff' }} >
                  <Box className='text-center'> */}
                    {/* <Typography variant='h6'>{userData.Name}</Typography> */}
                    {/* <Typography variant="subtitle1">{userData.Designation}</Typography> */} 
                    {/* <Typography variant='h6'>Mohit Soni</Typography>
                    <Typography variant="subtitle1">intern</Typography>
                  </Box>
                  
                </CardContent>
              </Card>
            </Grid> */}

          
          {/* {userData.map((userData, idx) => ( */}
            {/* <Grid item xs={6} md={8} lg={8} key="1" >
              <Card className='Card1' sx={{ mt: 1  }}  >
                <CardContent sx={{ bgcolor: '#fff' }} >
                  <div>

                    <table className='table text-center' >
                      <tbody>
                        <tr>
                          <th>Age :</th>
                          <td>19</td>
                        </tr>
                        <tr className='table-body'>
                          <th>Gender:</th> */}
                          {/* <td>{userData.Gender}</td> */}
                        {/* </tr>
                        <tr className='table-body'>
                          <th>Phone no:</th> */}
                          {/* <td>{userData.Mobile}</td> */}
                        {/* </tr>
                        <tr className='table-body'>
                          <th>Email ID:</th> */}
                          {/* <td>{userData.Email}</td> */}
                        {/* </tr>
                       
                        <tr className='table-body'>
                          <th>Qualification</th> */}
                          {/* <td>{userData.Qualification}</td> */}
                        {/* </tr>
                        <tr className='table-body'>
                          <th>RFID</th> */}
                          {/* <td>{userData.Rfid}</td> */}
                        {/* </tr>
                        <tr className='table-body'>
                          <th>Address</th> */}
                          {/* <td>{userData.Address}</td> */}
                        {/* </tr>
                      </tbody>

                    </table>


                  </div> */}



                {/* </CardContent>
              </Card>
            </Grid>

         
          <Grid item xs={6} md={8} lg={8} >
            <Card className='Card1' sx={{ mt: 1, minHeight: 450 }}  >
              <CardHeader
                title={
                  <Typography variant='h5'>Attendence detail</Typography>
                }
              />

              <CardContent sx={{ bgcolor: '#fff' }} className='d-flex-head text-center'> */}


                {/* <LineChart
                  width={700}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                > */}
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  {/* <XAxis dataKey="name" stroke='#5550bd' />
                  <Line type="monotone" dataKey="Active User" stroke="#5550bd" />
                  <Tooltip />
                  <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5" />
                </LineChart> */}


              {/* </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container> */}
// {/* <CardContent sx={{ bgcolor: '#fff' }}>
//                   <Table>
//                     <TableBody >
//                       <TableRow>
//                         <TableCell>RF ID</TableCell>
//                         <TableCell>{userData.Rfid}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Designation</TableCell>
//                         <TableCell>{userData.Designation}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Qualification</TableCell>
//                         <TableCell>{userData.Qualification}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Mobile</TableCell>
//                         <TableCell>{userData.Mobile}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Email</TableCell>
//                         <TableCell>{userData.Email}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell>Address</TableCell>
//                         <TableCell>{userData.Address}</TableCell>
//                       </TableRow>
//                     </TableBody>

//                   </Table>

//                 </CardContent>
//               </Card> */}
