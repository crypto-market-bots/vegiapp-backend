import axios from "axios";
import React, { forwardRef, createRef } from 'react';
import { CssBaseline, Box, Container, Paper, Typography, TextField, Button, Stepper, Avatar, Step, StepLabel, Grid, FormControl, Select, MenuItem, InputLabel, Input } from "@mui/material";
import { useState } from "react";
import { useForm, Controller, FormProvider, useFormContext, } from "react-hook-form";
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
const BasicForm = ({ image, setImage }) => {
    const { control, formState: { errors }, } = useFormContext();
    console.log(errors);

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
                    <Controller
                        control={control}
                        name="Name"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="Name"
                                label="Name"
                                variant="outlined"
                                placeholder="Enter First Name"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Name)}
                                helperText={errors.Name?.message}
                            />

                        )}
                    />

                    <Controller
                        control={control}
                        name="Mobile"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="Mobile"

                                label="Mobile"
                                type='number'
                                variant="outlined"
                                placeholder="Enter Mobile No"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Mobile)}
                                helperText={errors.Mobile?.message}
                            />

                        )}
                    />
                    <Controller
                        control={control}
                        name="Email"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="Email"
                                label="Email"
                                variant="outlined"
                                type='email'
                                placeholder="Enter Email"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Email)}
                                helperText={errors.Email?.message}
                            />

                        )}
                    />

                </Grid>

                <Grid item sx={12} md={6} lg={6}>
                    <Controller
                        control={control}
                        name="DOB"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="dob"
                                label="DOB"
                                type='date'
                                variant="outlined"
                                placeholder="DD//MM//YY"
                                fullWidth
                                margin="normal"
                                {...field}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={Boolean(errors?.DOB)}
                                helperText={errors.DOB?.message}
                            />

                        )}
                    />

                </Grid>
                <Grid item sx={12} md={6} lg={6}>
                    <Controller
                        control={control}
                        name="Gender"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="outlined-select-gender"
                                select
                                label="Gender"
                                variant="outlined"
                                placeholder="Enter Gender"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Gender)}
                                helperText={errors.Gender?.message}
                            >
                                {Gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        )}
                    />
                </Grid>
            </Grid>

        </>
    );



};

const ContactForm = () => {
    const { control, formState: { errors }, } = useFormContext();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} >
                    <Controller
                        control={control}
                        name="Joining"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="joining"
                                label="Joining Date"
                                type='date'
                                variant="outlined"
                                placeholder="DD//MM//YY"
                                fullWidth
                                margin="normal"
                                {...field}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={Boolean(errors?.Joining)}
                                helperText={errors.Joining?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="Qualification"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="qualification"
                                label="Qualification"
                                variant="outlined"
                                placeholder="Enter qualification"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Qualification)}
                                helperText={errors.Qualification?.message}
                            />
                        )}
                    />

                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Controller
                        control={control}
                        name="Designation"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="outlined-select-designation"
                                label="Designation"
                                select
                                variant="outlined"
                                placeholder="Enter designation"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Designation)}
                                helperText={errors.Designation?.message}
                            >

                                {designation.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                    <Controller
                        control={control}
                        name="RFID"
                        rules={{ required: "this field is required." }
                        }
                        render={({ field }) => (
                            <TextField
                                id="RFID"
                                label="RFID"
                                type='number'
                                variant="outlined"
                                placeholder="Enter RFID"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.RFID)}
                                helperText={errors.RFID?.message}
                            />
                        )}
                    />

                </Grid>
            </Grid>
        </>
    );
};
const PersonalForm = () => {
    const { control, formState: { errors }, } = useFormContext();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} >
                    <Controller
                        control={control}
                        name="address1"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="address1"
                                label="Address 1"
                                variant="outlined"
                                placeholder="Enter Your Address 1"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.address1)}
                                helperText={errors.address1?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Controller
                        control={control}
                        name="City"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="city"
                                label="City"
                                variant="outlined"
                                placeholder="Enter City"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.City)}
                                helperText={errors.City?.message}
                            />
                        )}
                    /><Controller
                        control={control}
                        name="State"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="State"
                                label="State"
                                variant="outlined"
                                placeholder="Enter State"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.State)}
                                helperText={errors.State?.message}
                            />
                        )}
                    />


                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Controller
                        control={control}
                        name="Country"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="Name"
                                label="Country"
                                variant="outlined"
                                placeholder="Enter Country"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Country)}
                                helperText={errors.Country?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="Zip"
                        rules={{ required: "this field is required." }}
                        render={({ field }) => (
                            <TextField
                                id="Mobile"
                                type='number'
                                label="Zip Code"
                                variant="outlined"
                                placeholder="Enter Code"
                                fullWidth
                                margin="normal"
                                {...field}
                                error={Boolean(errors?.Zip)}
                                helperText={errors.Zip?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

        </>
    );
};


const LinaerStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [image, setImage] = useState("")

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
                return <BasicForm image={image} setImage={setImage} />;
            case 1:
                return <ContactForm />;
            case 2:
                return <PersonalForm />;
            default:
                return "unknown step";
        }
    }

    const methods = useForm({
        defaultValues: {
            Name: "deepali",
            Mobile: "8765434",
            Email: "deepaligarg563@gmail.com",
            DOB: "10/12/2002",
            Gender: "female",
            Joining: "15/08/2022",
            Qualification: "bsc",
            Designation: "intern",
            RFID: "897865",
            address1: "jhj",
            City: "jnm",
            State: "njbnm",
            Country: "knjn",
            Zip: "0987",

        },
    });
    const steps = getSteps();

    const isStepFalied = () => {
        return Boolean(Object.keys(methods.formState.errors).length);
    };

    const handleNext = (data) => {
        
        const data1 = new FormData(data.currentTarget)
        
        for (let pair of data1.entries()) {
            console.log(pair[0] + ':- ' + pair[1]);
        }
        return
        if (activeStep == steps.length - 1) {
            axios.post("/add_user", data)
                .then((resp) => {
                    console.log("AXIOS resp", resp.data);
                    console.log("AXIOS resp msg", resp.data.Email);
                    // setActiveStep(activeStep + 1);
                })
                .catch((error) => {
                    console.log(error);
                  });
                }
        else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    return (
        <>
            <CssBaseline />
            <Container component={Box} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} p={4} >
                <Paper component={Box} p={3} sx={{ maxWidth: 800 }}>
                <Stepper alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const labelProps = {};
                            if (isStepFalied() && activeStep == index) {
                                labelProps.error = true;
                            }
                            return (
                                <Step key={index}>
                                    <StepLabel {...labelProps}>{step}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {activeStep === steps.length ? (
                        <Typography variant="h3" align="center">
                            User Added Succesfully
                        </Typography>
                    ) : (
                        <> 
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleNext)} className='form'>
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

                                        type="submit"
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </form>
                            </FormProvider>
                        </>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default LinaerStepper;
