import React from 'react';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Typography, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ChipInput from 'material-ui-chip-input';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Container, CssBaseline, Card, CardContent, CardHeader  } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
const EditProduct = () => {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       tags: []
    //     };

        // Add Chips
    // const handleAddChip = (chip) => {
    //         this.setState({
    //             tags: [...this.state.tags, chip]
    //         });
    //     }
    //     // Delete Chips
    // const handleDeleteChip = (chip) => {
    //         this.setState({
    //             tags: _.without(this.state.tags, chip)
    //         });
    //     }
    const QuantityType = [
        {
            value: 'kg',
            label: 'Kg',
        },
        {
            value: 'gm',
            label: 'Gm',
        },
        {
            value: 'piece',
            label: 'Pieces',
        },
    
    ];

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

    function createCard(Vegetable_Name, Rating, items_left, img) {
        return { Vegetable_Name, Rating, items_left, img };
    }

    const cards = [
        createCard('Awesome Product', 4, 3, 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png', true),
        createCard('Great!', 3, 1, 'https://cdn-icons-png.flaticon.com/512/4128/4128176.png'),

    ]
    const [expandedId, setExpandedId] = useState(false);
    const ids = [{ _id: "1" }, { _id: "2" }, { _id: "3" }, { _id: "4" }, { _id: "5" }, { _id: "6" }];
    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? false : i);
    };

    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Allium' },
        { key: 1, label: 'marrow' },
        { key: 2, label: 'Fresh Fruits' },
        // { key: 3, label: 'React' },
        { key: 4, label: 'root vegetables' },
      ]);
    
    const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
    }));

    
  return (
    <>
        <Grid container m={1} spacing={2}  wrap='wrap' disableEqualOverflow>
            <Grid item md={4}>
                <img
                    src={`https://hips.hearstapps.com/del.h-cdn.co/assets/17/25/980x735/sd-aspect-1497987605-strawberry-bowl.jpg?resize=1200:*`}
                    // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={'title'}
                    width={370}
                    // height={400}
                    loading="lazy"
                />
                  <Stack direction="row" display="flex" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
                      <Button variant="contained" component="label">
                          Upload
                          <input hidden accept="image/*" multiple type="file" />
                      </Button>
                      <IconButton color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" type="file" />
                          <PhotoCamera />
                      </IconButton>
                  </Stack>
            </Grid>
            <Grid container md={8} direction="column">
                <Grid container md={12} direction="row">
                    <Grid item md={3}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Product Id"
                            defaultValue="#03943929"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField 
                            id="outlined-basic" 
                            placeholder='Enter Product Name'
                            label="Product Name" 
                            variant="outlined" 
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormControlLabel
                            value="top"
                            control={<Switch color="primary" />}
                            label="Hide This Item"
                            labelPlacement="top"
                        />
                    </Grid>
                    <Grid item md={3}>
                        <FormControlLabel
                            value="top"
                            control={<Switch color="primary" />}
                            label="Out Of Stock"
                            labelPlacement="top"
                        />
                    </Grid>
                </Grid>

                <Grid container md={12} direction='row'>
                    <Grid md={2} direction="row"  >
                        <Grid>
                           <Typography>Rating</Typography>
                           <Rating name="read-only" value={2.5} readOnly/>
                        </Grid>     
                    </Grid>
                    <Grid container md={10} sx={{ display:'flex',justifyContent:"center",alignItems: 'center'}} direction={'rows'}>
                            <Grid><Typography>Category</Typography></Grid>
                                {/* <ChipInput
                                    label="Video Tags"
                                    defaultValue={['clown fish', 'whale', 'shark']}
                                    value={this.state.tags}
                                    onAdd={(chip) => this.handleAddChip(chip)}
                                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                                />     */}
                            <Grid>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        listStyle: 'none',
                                        p: 0.5,
                                        m: 0,
                                        width: 420
                                    }}
                                    component="ul"
                                >
                                    {chipData.map((data) => {
                                        let icon;

                                        if (data.label === 'React') {
                                            icon = <TagFacesIcon />;
                                        }

                                        return (
                                            <ListItem key={data.key}>
                                                <Chip
                                                    icon={icon}
                                                    label={data.label}
                                                    onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </Paper>
                            </Grid>
                       
                    </Grid>
                </Grid>

                <Grid item md={12}>
                      <TextField
                          id="outlined-multiline-static"
                          label="Description"
                          placeholder='Enter Product Description'
                          multiline
                          rows={4}
                          fullWidth
                      />
                </Grid>
            </Grid>
        </Grid>

        <Grid container ml={1} mr={5} spacing={2}  wrap='wrap' disableEqualOverflow>
            <Grid item md={4} >
                  <Card >
                      <CardHeader

                          title={
                              <Typography variant="h6">Reviews</Typography>
                          }
                          border="1px solid black"
                          sx={{ bgcolor: "#53B175", color: "#fff", height: 50 }}
                          align="center"
                      />
                      <CardContent className='Scroll-bar' sx={{height:200}}
                      >
                          {cards.map((card, i) => (
                              <Card sx={{ mt: 2, bgcolor: '#f5f5f5' }} key={card.taskName}>
                                  <CardHeader
                                      avatar={
                                          <Avatar aria-label="recipe" src={card.img}>
                                          </Avatar>
                                      }
                                      action={
                                          <ExpandMore

                                              aria-expanded={expandedId === i}
                                              aria-label="show more"
                                              onClick={() => { handleExpandClick(i) }}
                                          >
                                              <ExpandMoreIcon />
                                          </ExpandMore>
                                        //   <>
                                        //       {(() => {
                                        //           if (card.items_left < 1) {
                                        //               return (
                                        //                   <Typography variant="h7" sx={{ color: "gray" }} gutterBottom>Out of Stock</Typography>
                                        //               )
                                        //           }

                                        //           return (<Typography variant="h7" sx={{ color: "gray" }} gutterBottom>only {card.items_left} kg left</Typography>);
                                        //       })()}
                                        //   </>

                                      }
                                      title={
                                          <Typography variant="subtitle2" sx={{ fontSize: 18 }} gutterBottom  >
                                              {card.Vegetable_Name}
                                          </Typography>
                                      }
                                      subheader={
                                        //   <Typography sx={{ fontSize: 16 }} gutterBottom  >
                                        //       Category : {card.Category_Name}
                                        //   </Typography>
                                            <Rating name="read-only" value={card.Rating} readOnly/>
                                      }
                                  />
                                <Collapse in={expandedId === i} timeout="auto" unmountOnExit >
                                    <CardContent>
                                        <Typography variant='body' component='div'>Posted on 15 Dec, 2020 by </Typography>
                                        <Typography variant='h6' >
                                            Mohit Soni
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                              </Card>
                          ))}
                      </CardContent>
                  </Card>



            </Grid>
            <Grid container md={8} direction="column">
                <Grid container md={12} direction="row">
                    <Grid item md={3}>
                    <TextField
                        id="outlined-select-quantity-type"
                        select
                        label="Quantity Type"
                        variant="outlined"
                        // placeholder="Enter Gender"
                        fullWidth
                        margin="normal"
                        // value={initialValues.QuantityType}
                        // onChange={(event) => {
                        //     setInitialValues({ ...initialValues, QuantityType: event.target.value })
                        // }}
                        // error={formErrors.QuantityType}
                        // helperText={formErrors.QuantityType}
                    >
                        {QuantityType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>


                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="stock-limit"
                            // label="Mobile"
                            label="Stock Limit"
                            type='number'
                            placeholder="Enter Amount"
                            fullWidth
                            margin="normal"
                            // value={initialValues.sellingPrice}
                            // onChange={(event) => {
                            //     setInitialValues({ ...initialValues, sellingPrice: event.target.value })
                            // }}
                            // error={formErrors.sellingPrice}
                            // helperText={formErrors.sellingPrice}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="total-stock"
                            // label="Mobile"
                            label="Total Stock"
                            type='number'
                            placeholder="Enter Amount"
                            fullWidth
                            margin="normal"
                            // value={initialValues.sellingPrice}
                            // onChange={(event) => {
                            //     setInitialValues({ ...initialValues, sellingPrice: event.target.value })
                            // }}
                            // error={formErrors.sellingPrice}
                            // helperText={formErrors.sellingPrice}
                        />
                    </Grid>
                    <Grid item md={3} margin="normal" sx={{display:'flex',justifyContent:'center', alignItems: 'center'}}>
                        <Button variant="contained" >Add Stock +</Button>
                    </Grid>
                </Grid>
                <Grid container md={12} direction="row">
                    <Grid item md={3}>
                        <TextField
                            id="quantity"
                            // label="Mobile"
                            label="Quantity"
                            type='number'
                            placeholder="Enter Amount"
                            fullWidth
                            margin="normal"
                            // value={initialValues.sellingPrice}
                            // onChange={(event) => {
                            //     setInitialValues({ ...initialValues, sellingPrice: event.target.value })
                            // }}
                            // error={formErrors.sellingPrice}
                            // helperText={formErrors.sellingPrice}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="original price"
                            // label="Mobile"
                            label="Original Price"
                            type='number'
                            placeholder="Enter Amount"
                            fullWidth
                            margin="normal"
                            // value={initialValues.sellingPrice}
                            // onChange={(event) => {
                            //     setInitialValues({ ...initialValues, sellingPrice: event.target.value })
                            // }}
                            // error={formErrors.sellingPrice}
                            // helperText={formErrors.sellingPrice}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="discount"
                            // label="Mobile"
                            label="Discount(%)"
                            type='number'
                            placeholder="Enter discount in percentage"
                            fullWidth
                            margin="normal"
                            // value={initialValues.sellingPrice}
                            // onChange={(event) => {
                            //     setInitialValues({ ...initialValues, sellingPrice: event.target.value })
                            // }}
                            // error={formErrors.sellingPrice}
                            // helperText={formErrors.sellingPrice}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="outlined-read-only-input"
                            label="Price After Discount (Rs)"
                            defaultValue="0"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container md={12} direction="row" sx={{justifyContent:"flex-end"}}>
                    <Grid item md={2}>
                        <Button variant="contained">Save</Button>
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained">Cancel</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}

export default EditProduct