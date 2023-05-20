import React, { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import MapComponent from "components/Map";
import { useSignupMutation } from "api/useSignupMutation";

function Cover() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [location, setLocation] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [checked, setChecked] = useState(false);
    const { mutate, isSuccess, isError, data, error } = useSignupMutation();
    const navigate = useNavigate();

    const openSuccessSB = () => setSuccessSB(true);
    const closeSuccessSB = () => setSuccessSB(false);
    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSignup = () =>
        mutate({
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            location: location,
            locationName: locationName,
        });

    useEffect(() => {
        if (isSuccess) {
            console.log(data.message);
            setSuccessMessage(data.message);
            openSuccessSB();
            setName("");
            setEmail("");
            setPassword("");
            setMobile("");
            setLocation(null);
            setLocationName("");
        }

        if (isError) {
            setErrorMessage(error.response.data.message);
            openErrorSB();
            setName("");
            setEmail("");
            setPassword("");
            setMobile("");
            setLocation(null);
            setLocationName("");
        }
    }, [isSuccess, isError, data, error]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting current location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    const renderSuccessSB = (
        <MDSnackbar
            color="success"
            icon="check"
            title="Registered successfully"
            content={successMessage}
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
            dateTime=""
        />
    );

    const renderErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Registration failed"
            content={errorMessage}
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
            dateTime=""
        />
    );

    return (
        <>
            <BasicLayout image={bgImage}>
                <Card>
                    <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="success"
                        mx={2}
                        mt={-3}
                        p={3}
                        mb={1}
                        textAlign="center"
                    >
                        <MDTypography
                            variant="h4"
                            fontWeight="medium"
                            color="white"
                            mt={1}
                        >
                            Join us today
                        </MDTypography>
                        <MDTypography
                            display="block"
                            variant="button"
                            color="white"
                            my={1}
                        >
                            Enter your email and password to register
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={3} px={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Petrol Pump"
                                    variant="standard"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="email"
                                    label="Email ( gmail )"
                                    variant="standard"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </MDBox>

                            <MDBox mb={2}>
                                <MDInput
                                    type="password"
                                    label="Password"
                                    variant="standard"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="number"
                                    label="Mobile"
                                    variant="standard"
                                    inputProps={{
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                        maxLength: 10,
                                        minLength: 10,
                                    }}
                                    onChange={(e) => {
                                        setMobile(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDBox mt={4} mb={1}>
                                    <MDButton
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                        onClick={handleOpenDialog}
                                    >
                                      Choose Location
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Location coordinates"
                                    variant="standard"
                                    value={
                                        location
                                            ? location.latitude +
                                              " : " +
                                              location.longitude
                                            : ""
                                    }
                                    fullWidth
                                    disabled
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Location"
                                    variant="standard"
                                    value={locationName}
                                    fullWidth
                                    disabled
                                />
                            </MDBox>
                            <MDBox display="flex" alignItems="center" ml={-1}>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleCheckboxChange}
                                />
                                <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    color="text"
                                    sx={{
                                        cursor: "pointer",
                                        userSelect: "none",
                                        ml: -1,
                                    }}
                                >
                                    &nbsp;&nbsp;I agree the&nbsp;
                                </MDTypography>
                                <MDTypography
                                    component="a"
                                    href="#"
                                    variant="button"
                                    fontWeight="bold"
                                    color="info"
                                    textGradient
                                >
                                    Terms and Conditions
                                </MDTypography>
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                                <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={handleSignup}
                                    fullWidth
                                    disabled={
                                        name != "" &&
                                        email != "" &&
                                        password != "" &&
                                        mobile != "" &&
                                        location != null &&
                                        locationName != "" &&
                                        checked &&
                                        mobile.length == 10 &&
                                        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
                                            ? false
                                            : true
                                    }
                                >
                                    sign Up
                                </MDButton>
                            </MDBox>
                            <MDBox mt={3} mb={1} textAlign="center">
                                <MDTypography variant="button" color="text">
                                    Already have an account?{" "}
                                    <MDTypography
                                        component={Link}
                                        to="/sign-in"
                                        variant="button"
                                        color="info"
                                        fontWeight="medium"
                                        textGradient
                                    >
                                        Sign In
                                    </MDTypography>
                                </MDTypography>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                    {renderErrorSB}
                    {renderSuccessSB}
                </Card>
            </BasicLayout>
            {/* Location Picker Dialog */}
            <Dialog
                maxWidth="lg"
                fullWidth
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Choose Location</DialogTitle>
                <DialogContent sx={{ height: "700px" }}>
                    <MapComponent
                        initialLocation={currentLocation}
                        setLocation={setLocation}
                        setLocationName={setLocationName}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Cover;
