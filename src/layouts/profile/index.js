// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import SidenavCustom from "examples/CustomSideNav";

// Overview page components
import Header from "layouts/profile/components/Header";
import useAuth from "hooks";
import { useEffect, useState } from "react";
import { useFetchPumpDetailsQuery } from "api/useFetchPumpOwnerQuery";

function Overview() {
    const { auth } = useAuth();
    const [pumpOwner, setPumpOwner] = useState({
        name: "",
        email: "",
        pumpOwnerId: "",
        location: { latitude: 0, longitude: 0 },
        mobile: "",
        locationName: "",
    });

    const { data, isLoading, isSuccess, isError, error } = useFetchPumpDetailsQuery(
        auth.user.pumpOwnerId
    );

    useEffect(() => {
        if (isSuccess) {
            setPumpOwner(data.data);
        }

        if (isError) {
            console.log(error.response.data);
        }
    }, [isSuccess, isError, data, error]);

    return (
        <>
            <SidenavCustom />
            <DashboardLayout>
                <DashboardNavbar />
                {/* <MDBox mb={2} /> */}
                <Header>
                    <MDBox mt={5} mb={3}>
                        <Grid container spacing={1}>
                            <Grid
                                item
                                xs={12}
                                md={12}
                                xl={12}
                                sx={{ display: "flex" }}
                            >
                                <ProfileInfoCard
                                    title="Description"
                                    description="lorem ipsum dolor sit amet, consectetur adipiscing el aspect et accus   et in reprehenderit in voluptate velit esse cillum dolore magna aliquet"
                                    info={{
                                        "Pump Name": pumpOwner.name,
                                        "Pump Id": pumpOwner.pumpOwnerId,
                                        Mobile: pumpOwner.mobile,
                                        Email: pumpOwner.email,
                                        Location:
                                            "Latitude : " +
                                            pumpOwner.location.latitude +
                                            " \t Longitude : " +
                                            pumpOwner.location.longitude,
                                        "Location Name": pumpOwner.locationName,
                                    }}
                                    social={[
                                        {
                                            link: "#",
                                            icon: <FacebookIcon />,
                                            color: "facebook",
                                        },
                                        {
                                            link: "#",
                                            icon: <TwitterIcon />,
                                            color: "twitter",
                                        },
                                        {
                                            link: "#",
                                            icon: <InstagramIcon />,
                                            color: "instagram",
                                        },
                                    ]}
                                    action={{
                                        route: "",
                                        tooltip: "Edit Profile",
                                    }}
                                    shadow={false}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </Header>
            </DashboardLayout>
        </>
    );
}

export default Overview;
