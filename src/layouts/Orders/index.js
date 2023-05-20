// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import { DataGrid } from "@mui/x-data-grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomSideNav from "examples/CustomSideNav";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/Orders/data/authorsTableData";
import useAuth from "hooks";
import { useFetchOrdersQuery } from "api/useFetchOrdersQuery";
import { useEffect, useState } from "react";
import MDBadge from "components/MDBadge";
import { Box, IconButton } from "@mui/material";

// icons
import { useRejectOrderMutation } from "api/useRejectOrderMutation";

function Tables() {
    const { auth } = useAuth();

    const [col, setCol] = useState([]);
    const [row, setRow] = useState([]);
    const { data, isSuccess, isError, error, refetch } =
        useFetchOrdersQuery(auth.user.pumpOwnerId);
    const {
        data: rejectData,
        isLoading: rejectIsLoading,
        isSuccess: rejectIsSuccess,
        isError: rejectIsError,
        error: rejectError,
        mutate: rejectMutate,
    } = useRejectOrderMutation();
    useEffect(() => {
        if (isSuccess) {
            console.log("here");
            const { columns, rows } = authorsTableData(
                data.data,
                handleAccept,
                handleReject
            );
            setCol(columns);
            setRow(rows);
        }

        if (isError) {
            console.log(error.response.data);
        }
    }, [isSuccess, isError, data, error]);
    useEffect(() => {
        if (rejectIsSuccess) {
            console.log("mutation is successful");
            // Fetch the orders data again by invalidating the query
            // queryClient.invalidateQueries(["data", auth.user.pumpOwnerId]);

            refetch();

            console.log("Invalidate Query Key:", [
                "data",
                auth.user.pumpOwnerId,
            ]);
        }

        if (rejectIsError) {
            console.log(error.response.data);
        }
    }, [rejectIsSuccess, rejectIsError, rejectData, rejectError]);

    // const queryClient = useQueryClient();

    // const { mutate } = useMutation(updateOrderStatus, {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(["data", pumpOwnerId]);

    const handleAccept = (orderId) => {
        console.log(orderId);
    };

    const handleReject = (orderId) => {
        rejectMutate({ pumpOwnerId: auth.user.pumpOwnerId, orderId: orderId });
    };

    const columnsFinal = col;
    const rowsFinal = row;

    return (
        <>
            <CustomSideNav />
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                >
                                    <MDTypography variant="h6" color="white">
                                        Orders
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <DataTable
                                        table={{
                                            columns: columnsFinal,
                                            rows: rowsFinal,
                                        }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </>
    );
}

export default Tables;
