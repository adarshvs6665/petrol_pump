import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

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
import useAuth from "hooks";
import { useLoginMutation } from "api/useLoginMutation";

function Basic() {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setAuth, auth } = useAuth();
    const [errorSB, setErrorSB] = useState(false);
    const { mutate, isSuccess, isError, data, error } = useLoginMutation();
    const navigate = useNavigate();

    const openErrorSB = () => setErrorSB(true);
    const closeErrorSB = () => setErrorSB(false);
    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const handleSignIn = () => mutate({ email: email, password: password });

    useEffect(() => {
        if (isSuccess) {
            console.log(data.data);
            const newAuth = { authenticated: true, user: data.data };
            localStorage.setItem("user", JSON.stringify(newAuth));
            setAuth(newAuth);
            navigate("/dashboard");
        }

        if (isError) {
            const auth = { authenticated: false, user: {} };
            localStorage.setItem("user", JSON.stringify(auth));
            setAuth(auth);
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
            openErrorSB();
            setEmail("");
            setPassword("");
        }
    }, [isSuccess, isError, data, error]);

    // Handle navigation to the dashboard if isAuthenticated is true
    useEffect(() => {
        if (auth.authenticated) {
            navigate("/dashboard"); // Navigate to the dashboard route
            return <></>; // Return null or loading state while navigating
        }
    });

    const renderErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Login failed"
            content={errorMessage}
            open={errorSB}
            onClose={closeErrorSB}
            close={closeErrorSB}
            bgWhite
            dateTime=""
        />
    );

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography
                        variant="h4"
                        fontWeight="medium"
                        color="white"
                        mt={1}
                    >
                        Sign in
                    </MDTypography>
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        {/* <Grid item xs={2}>
              
            </Grid> */}
                    </Grid>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="password"
                                label="Password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </MDBox>
                        <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch
                                checked={rememberMe}
                                onChange={handleSetRememberMe}
                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                onClick={handleSetRememberMe}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    ml: -1,
                                }}
                            >
                                &nbsp;&nbsp;Remember me
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton
                                variant="gradient"
                                color="info"
                                fullWidth
                                onClick={handleSignIn}
                            >
                                sign in
                            </MDButton>
                        </MDBox>
                        <MDBox mt={3} mb={1} textAlign="center">
                            <MDTypography variant="button" color="text">
                                Don&apos;t have an account?{" "}
                                <MDTypography
                                    component={Link}
                                    to="/sign-up"
                                    variant="button"
                                    color="info"
                                    fontWeight="medium"
                                    textGradient
                                >
                                    Sign up
                                </MDTypography>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </MDBox>
                {renderErrorSB}
            </Card>
        </BasicLayout>
    );
}

export default Basic;
