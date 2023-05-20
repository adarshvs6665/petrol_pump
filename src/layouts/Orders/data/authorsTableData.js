/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// MUI imports
// import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
// import SendIcon from "@mui/icons-material/Send";
// import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useFetchOrdersQuery } from "api/useFetchOrdersQuery";
import useAuth from "hooks";

export default function data(data, handleAccept, handleReject) {
    const rows = data.map((item) => {
        console.log(item);
        const isRejected = item.rejected;
        const isAccepted = item.accepted;

        const handleAcceptClick = () => {
            handleAccept(item.orderId);
        };

        const handleRejectClick = () => {
            handleReject(item.orderId);
        };

        const getColor = () => {
            if (isRejected) return "dark";
            else if (item.status == "PENDING") return "warning";
            else if (item.status == "DELIVERY") return "primary";
            else if (item.status == "COMPLETED") return "success";
        };

        return {
            id: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.orderId}
                </MDTypography>
            ),
            orderItem: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.item.name}
                </MDTypography>
            ),
            orderDate: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {new Date().toLocaleDateString()}{" "}
                </MDTypography>
            ),orderQuantity: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.item.quantity}
                </MDTypography>
            ),
            orderAmount: (
                <MDTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="text"
                    fontWeight="medium"
                >
                    {item.item.price + " ₹"}
                </MDTypography>
            ),
            orderStatus: (
                <MDBox ml={-1}>
                    {/* {console.log(isRejected)}
                    {console.log(item.status == "PENDING")} */}
                    <MDBadge
                        badgeContent={isRejected ? "REJECTED" : item.status}
                        color={getColor()}
                        variant="gradient"
                        size="sm"
                    />
                </MDBox>
            ),
            action: (
                <Box>
                    <IconButton
                        aria-label="delete"
                        color="primary"
                        disabled={isRejected || item.status != "PENDING"}
                        onClick={handleRejectClick}
                    >
                        <CloseIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="success"
                        disabled={isRejected || item.status != "PENDING"}
                        onClick={handleAcceptClick}
                    >
                        <DoneIcon />
                    </IconButton>
                </Box>
            ),
        };
    });

    return {
        columns: [
            { Header: "Order Id", accessor: "id", width: "30%", align: "left" },
            { Header: "Item", accessor: "orderItem", align: "center" },
            { Header: "Date", accessor: "orderDate", align: "center" },
            { Header: "Quantity", accessor: "orderQuantity", align: "center" },
            { Header: "Amount", accessor: "orderAmount", align: "center" },
            {
                Header: "Order Status",
                accessor: "orderStatus",
                align: "center",
            },
            { Header: "Action", accessor: "action", align: "center" },
        ],

        rows: rows,
    };
}
