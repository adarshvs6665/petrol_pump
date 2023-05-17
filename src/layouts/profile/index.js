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

function Overview() {
  return (
    <>
      <SidenavCustom />
      <DashboardLayout>
        <DashboardNavbar />
        {/* <MDBox mb={2} /> */}
        <Header>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
                <ProfileInfoCard
                  title="Description"
                  description="lorem ipsum dolor sit amet, consectetur adipiscing el aspect et accus   et in reprehenderit in voluptate velit esse cillum dolore magna aliquet"
                  info={{
                    "Pump Name": "Indian Oil",
                    Mobile: "+91 9544543210",
                    Email: "example@gmail.com",
                    Location: "Poojappura",
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
                  action={{ route: "", tooltip: "Edit Profile" }}
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
