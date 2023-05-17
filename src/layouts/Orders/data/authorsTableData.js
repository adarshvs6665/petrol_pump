/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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

export default function data() {
  return {
    columns: [
      { Header: "Order Id", accessor: "id", width: "30%", align: "left" },
      { Header: "Item", accessor: "orderItem", align: "center" },
      { Header: "Date", accessor: "orderDate", align: "center" },
      { Header: "Order Status", accessor: "orderStatus", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            uiashdof8asdfjmas9d898u
          </MDTypography>
        ),
        orderItem: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        orderDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        orderStatus: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Pending" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <Box>
            <IconButton aria-label="delete" color="primary">
              <CloseIcon />
            </IconButton>
            <IconButton aria-label="delete" color="success">
              <DoneIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
  };
}
