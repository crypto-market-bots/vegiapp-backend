import React from 'react'
import { CssBaseline, Grid, Card, CardContent, Container, CardHeader, Avatar, TableBody, Table, TableRow, TableCell, Typography, Box, Button } from '@mui/material';
import { blue } from '@mui/material/colors'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UserDetail() {
  const [userData, setUserData] = useState([]);
  const { Employee_ID } = useParams();
  const getData = () => {
    axios.get(`/user_detail/${Employee_ID}`)

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
    console.log("PARAMS", Employee_ID);
  }, []);
  const navigate = useNavigate();
  const addUser = () => {
    navigate('/new_user')
  }


  return (
    <>
      <Box className='d-flex align-items-center justify-content-between card-header' sx={{ bgcolor: 'primary.main' }}>
        <Typography
          component="h1"
          variant="h6"
          color="#fff"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          User Detail
        </Typography>
        <Button sx={{ color: '#fff' }} onClick={addUser}>Add user</Button>

      </Box>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {userData.map((userData, idx) => (
            <Grid item xs={12} md={6} lg={6} key={idx} >
              {/* <Card className='Card' sx={{ mt: 1 }}  >

                <CardContent className='d-flex-head' >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <CircleIcon sx={userData.status == '1' ?
                        { backgroundColor: '#117011', color: '#117011', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                        : { backgroundColor: '#FF0000', color: '#FF0000', border: '2px solid #fff', borderRadius: '50%', width: 20, height: 20 }
                      } >
                      </CircleIcon>
                    }

                  >
                    <Avatar src={""} className='pic' sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
                    </Avatar>
                  </Badge>


                </CardContent>

                <CardContent sx={{ bgcolor: '#fff' }} className='d-flex-head text-center'>
                  <Box className='text-center'>
                    <Typography variant='h6'>{userData.Name}</Typography>
                  </Box>
                  <Table >
                    <TableBody >
                      <TableRow>
                        <td>{userData.Designation}</td>
                      </TableRow>
                      <TableRow>
                        <td>{userData.Mobile}</td>
                      </TableRow>
                      <TableRow>
                        <td>{userData.Email}</td>
                      </TableRow>
                    </TableBody>

                  </Table>

                </CardContent>
                <CardActions className='button'>
                  <Button size='small' clicked={clicked === i} onClick={() => { handleNew(i) }} fullWidth>Details</Button>
                </CardActions>

              </Card> */}
              <Card sx={{ mt: 2 }} >
                <CardHeader
                  avatar={
                    <Avatar sx={{ width: 120, height: 120, bgcolor: blue[300] }}>
                      D
                    </Avatar>
                  }
                  title={
                    <>
                      <Typography variant="subtitle2" sx={{ fontSize: 20 }} gutterBottom  >
                        {userData.Name}
                      </Typography>

                    </>

                  }
                  subheader={
                    <Typography variant="subtitle1" sx={{ fontSize: 18 }} gutterBottom  >
                      {userData.Gender}
                    </Typography>
                  }

                />
                <CardContent sx={{ bgcolor: '#fff' }}>
                  <Table>
                    <TableBody >
                      <TableRow>
                        <TableCell>RF ID</TableCell>
                        <TableCell>{userData.Rfid}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Designation</TableCell>
                        <TableCell>{userData.Designation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Qualification</TableCell>
                        <TableCell>{userData.Qualification}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mobile</TableCell>
                        <TableCell>{userData.Mobile}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{userData.Email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>{userData.Address}</TableCell>
                      </TableRow>
                    </TableBody>

                  </Table>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}