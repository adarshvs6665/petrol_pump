import React from "react";
// routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import Sidenav from "examples/Sidenav";
import useAuth from "hooks";

function CustomSideNav() {
  const { auth} = useAuth();
  const [controller] = useMaterialUIController();
  const { sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  return (
    <Sidenav
      color={sidenavColor}
      brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
      brandName={auth.user.name}
      routes={routes}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={handleOnMouseLeave}
    />
  );
}

export default CustomSideNav;
