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
import { useAcceptOrderMutation } from "api/useAcceptOrderMutation";

function Tables() {
    const { auth } = useAuth();

    const [col, setCol] = useState([]);
    const [row, setRow] = useState([]);
    const { data, isSuccess, isError, error, refetch } = useFetchOrdersQuery(
        auth.user.pumpOwnerId
    );

    const {
        data: rejectData,
        isLoading: rejectIsLoading,
        isSuccess: rejectIsSuccess,
        isError: rejectIsError,
        error: rejectError,
        mutate: rejectMutate,
    } = useRejectOrderMutation();

    const {
        data: acceptData,
        isLoading: acceptIsLoading,
        isSuccess: acceptIsSuccess,
        isError: acceptIsError,
        error: acceptError,
        mutate: acceptMutate,
    } = useAcceptOrderMutation();

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
            refetch();
        }

        if (rejectIsError) {
            console.log(rejectError.response.data);
        }
    }, [rejectIsSuccess, rejectIsError, rejectData, rejectError]);
    useEffect(() => {
        if (acceptIsSuccess) {
            console.log("mutation is successful");
            refetch();
        }

        if (acceptIsError) {
            console.log(acceptError.response.data);
        }
    }, [acceptIsSuccess, acceptIsError, acceptData, acceptError]);

    const handleAccept = (orderId) => {
        acceptMutate({ pumpOwnerId: auth.user.pumpOwnerId, orderId: orderId });
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
