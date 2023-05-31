import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Login } from "./pages/auth/login";
import { Customer } from "./pages/customer/customer";
// import PageNotFound from "./pages/PageNotFound";
import { Packages } from "./pages/package/package";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("login"))
  );

  console.log(Boolean(localStorage.getItem("login")));
  // useEffect(() => {
  //   const loginState = Boolean(localStorage.getItem("login"));
  //   setIsAuthenticated(loginState);
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route exact path="/" Component={Login} />
            </>
          )}
          {/* {isAuthenticated && (
            <> */}
          <Route exact path="/dashboard" Component={Dashboard} />
          <Route exact path="/customer" Component={Customer} />
          <Route exact path="/package" Component={Packages} />
          {/* </>
          )} */}
          {/* <Route exact path="*" Component={PageNotFound} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Navigation;
