import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Login } from "./pages/auth/login";
import { Customer } from "./pages/customer/customer";
// import PageNotFound from "./pages/PageNotFound";
import { Packages } from "./pages/package/package";
import { AddCategory } from "./pages/category/addCategory";
import { Booking } from "./pages/booking/booking";
import { UpdatePackage } from "./pages/package/updatePackage";

function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("login"))
  );

  // console.log(Boolean(localStorage.getItem("login")));
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route exact path="/" Component={Login} />
            </>
          )}

          <Route exact path="/dashboard" Component={Dashboard} />
          <Route exact path="/customer" Component={Customer} />
          <Route exact path="/package" Component={Packages} />
          <Route exact path="/category" Component={AddCategory} />
          <Route exact path="/booking" Component={Booking} />
          <Route exact path="/updatePackage/:id" Component={UpdatePackage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Navigation;
