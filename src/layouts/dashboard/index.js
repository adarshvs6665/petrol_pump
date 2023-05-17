// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import SidenavCustom from "examples/CustomSideNav";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <>
      <SidenavCustom />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Completed orders"
                count={281}
              />
              {/* </MDBox> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard icon="leaderboard" title="Pending orders" count="22" />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Out for delivery"
                  count="34"
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="daily sales"
                    description={
                      <>
                        (<strong>+15%</strong>) increase in today sales.
                      </>
                    }
                    date="updated 4 min ago"
                    chart={sales}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="completed orders"
                    description="Performance"
                    date="just updated"
                    chart={tasks}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
