import axios from "axios";
import React from 'react';
import { CssBaseline, Box, Container, Paper, Typography, TextField, Button, Stepper, Avatar, Step, StepLabel, Grid,  MenuItem,  } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import 'react-phone-number-input/style.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Gender = [
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
const designation = [
    {
        value: 'backend developer',
        label: 'Backend Developer',
    },
    {
        value: 'Forntend developer',
        label: 'Frontend Developer',
    },
    {
        value: 'Full Stack developer',
        label: 'Full Stack Developer',
    },
    {
        value: 'intern',
        label: 'intern',
    },
    {
        value: 'sofware developer',
        label: 'Software Developer',
    },

]
const BasicForm = ({ image, setImage, initialValues, setInitialValues }) => {

    const handleImage = (e) => {
        const data = e.target.files[0]
        setImage(data)
    }
    const handlePic = () => {
        setImage("")
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4} >

                    {
                        image ?
                            <div className="avatar">
                                <Avatar src={URL.createObjectURL(image)} sx={{ width: 200, height: 200 }}></Avatar>
                                {/* <Button variant='outlined' sx={{mt: 1 , color: '#000000'}} onClick={handlePic}>delete</Button> */}
                                <IconButton onClick={handlePic} aria-label="delete" size="large">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            :
                            <label className="flex">
                                <AddIcon sx={{ width: 100, height: 80, color: 'primary.main' }} />
                                <input className="hidden" type='file' onChange={handleImage} />
                            </label>

                    }


                </Grid>
                <Grid item xs={12} md={6} lg={8}>

                    <TextField
                        id="Name"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter First Name"
                        fullWidth
                        margin="normal"
                        value={initialValues.Name}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Name: event.target.value })
                        }}
                    />
                    <TextField
                        id="Mobile"
                        label="Mobile"
                        type='number'
                        variant="outlined"
                        placeholder="Enter Mobile No"
                        fullWidth
                        margin="normal"
                        value={initialValues.Mobile}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Mobile: event.target.value })
                        }}
                    />
                    <TextField
                        id="Email"
                        label="Email"
                        variant="outlined"
                        type='email'
                        placeholder="Enter Email"
                        fullWidth
                        margin="normal"
                        value={initialValues.Email}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Email: event.target.value })
                        }}
                    />

                </Grid>

                <Grid item sx={12} md={6} lg={6}>
                    <TextField
                        id="dob"
                        label="DOB"
                        type='date'
                        variant="outlined"
                        placeholder="DD//MM//YY"
                        fullWidth
                        margin="normal"

                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={initialValues.DOB}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, DOB: event.target.value })
                        }}

                    />


                </Grid>
                <Grid item sx={12} md={6} lg={6}>

                    <TextField
                        id="outlined-select-gender"
                        select
                        label="Gender"
                        variant="outlined"
                        placeholder="Enter Gender"
                        fullWidth
                        margin="normal"
                        value={initialValues.Gender}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Gender: event.target.value })
                        }}
                    >
                        {Gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

        </>
    );



};

const ContactForm = ({ initialValues, setInitialValues }) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} >

                    <TextField
                        id="joining"
                        label="Joining Date"
                        type='date'
                        variant="outlined"
                        placeholder="DD//MM//YY"
                        fullWidth
                        margin="normal"
                        value={initialValues.Joining}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, joining: event.target.value })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />

                    <TextField
                        id="qualification"
                        label="Qualification"
                        variant="outlined"
                        placeholder="Enter qualification"
                        fullWidth
                        margin="normal"
                        value={initialValues.Qualification}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Qualification: event.target.value })
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={6} lg={6}>

                    <TextField
                        id="outlined-select-designation"
                        label="Designation"
                        select
                        variant="outlined"
                        placeholder="Enter designation"
                        fullWidth
                        margin="normal"
                        value={initialValues.Designation}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Designation: event.target.value })
                        }}

                    >

                        {designation.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>


                    <TextField
                        id="RFID"
                        label="RFID"
                        type='number'
                        variant="outlined"
                        placeholder="Enter RFID"
                        fullWidth
                        margin="normal"
                        value={initialValues.RFID}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, RFID: event.target.value })
                        }}

                    />

                </Grid>
            </Grid>
        </>
    );
};
const PersonalForm = ({ initialValues, setInitialValues }) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} >

                    <TextField
                        id="address1"
                        label="Address 1"
                        variant="outlined"
                        placeholder="Enter Your Address 1"
                        fullWidth
                        margin="normal"
                        value={initialValues.address1}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, address1: event.target.value })
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={6} lg={6}>

                    <TextField
                        id="city"
                        label="City"
                        variant="outlined"
                        placeholder="Enter City"
                        fullWidth
                        margin="normal"
                        value={initialValues.City}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, City: event.target.value })
                        }}
                    />
                    <TextField
                        id="State"
                        label="State"
                        variant="outlined"
                        placeholder="Enter State"
                        fullWidth
                        margin="normal"
                        value={initialValues.State}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, State: event.target.value })
                        }}
                    />


                </Grid>
                <Grid item xs={12} md={6} lg={6}>

                    <TextField
                        id="Name"
                        label="Country"
                        variant="outlined"
                        placeholder="Enter Country"
                        fullWidth
                        margin="normal"
                        value={initialValues.Country}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Country: event.target.value })
                        }}
                    />


                    <TextField
                        id="Mobile"
                        type='number'
                        label="Zip Code"
                        variant="outlined"
                        placeholder="Enter Code"
                        fullWidth
                        margin="normal"
                        value={initialValues.Zip}
                        onChange={(event) => {
                            setInitialValues({ ...initialValues, Zip: event.target.value })
                        }}
                    />

                </Grid>
            </Grid>

        </>
    );
};


const LinaerStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [image, setImage] = useState("")
    const [initialValues, setInitialValues] = useState({
        Name: "deepali",
        Mobile: "8765434",
        Email: "deepaligarg563@gmail.com",
        DOB: "",
        Gender: "female",
        Joining: "",
        Qualification: "bsc",
        Designation: "intern",
        RFID: "897865",
        address1: "jhj",
        City: "jnm",
        State: "njbnm",
        Country: "knjn",
        Zip: "0987",
    })

    function getSteps() {
        return [
            "Personal information",
            "Office Information",
            "Address",
        ];
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <BasicForm initialValues={initialValues} setInitialValues={setInitialValues} image={image} setImage={setImage} />;
            case 1:
                return <ContactForm initialValues={initialValues} setInitialValues={setInitialValues} />;
            case 2:
                return <PersonalForm initialValues={initialValues} setInitialValues={setInitialValues} />;
            default:
                return "unknown step";
        }
    }

    const steps = getSteps();
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleNext = () => {
        if (activeStep == steps.length - 1) {
            let formData = new FormData();
            formData.append("image", image)

            Object.keys(initialValues).forEach(key => {
                formData.append(`${key}`, initialValues[`${key}`])
            })
            for (var pair of formData.entries()) {
                console.log(pair[0] + ':- ' + pair[1]);
            }

            axios.post("/add_user", formData)
                .then((resp) => {
                   console.log(resp.data)
                   setActiveStep(activeStep + 1);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        else {
            setActiveStep(activeStep + 1);
        }



    }
    return (
        <>
            <CssBaseline />
            <Container component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} p={4} >
                <Paper component={Box} p={3} sx={{ maxWidth: 800 }}>
                    <Stepper alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const labelProps = {};

                            return (
                                <Step key={index}>
                                    <StepLabel {...labelProps}>{step}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {activeStep === steps.length ? (
                        alert("user addeed")
                    ) : (
                        <>

                            <Box component="form" className='form'>
                                {getStepContent(activeStep)}

                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mx: 2 }}
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    back
                                </Button>

                                <Button
                                    sx={{ mt: 2, mx: 2 }}
                                    variant="contained"
                                    color="primary"

                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                            </Box>

                        </>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default LinaerStepper;
