import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Images
// import brandWhite from "assets/images/logo-ct.png";
// import brandDark from "assets/images/logo-ct-dark.png";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

export default function App() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  // const { sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      {/* <Sidenav
        color={sidenavColor}
        brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
        brandName="Material Dashboard 2"
        routes={routes}
        // onMouseEnter={handleOnMouseEnter}
        // onMouseLeave={handleOnMouseLeave}
      /> */}
      {/* <Configurator /> */}
      {/* {configsButton} */}

      <Routes>
        {getRoutes(routes)}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
