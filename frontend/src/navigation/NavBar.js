import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import "./NavBar.css";

/** Navigation bar, to appear on every render. */

const NavBar = () => {
    return (
        <div>
            <Navbar expand="md">
                <NavLink to="/" className="company-name">
                    Jobly
                </NavLink>

                <Nav className="page-options" navbar>
                    <NavLink to="/companies">
                        Companies
                    </NavLink>
                    <NavLink to="/jobs">
                        Jobs
                    </NavLink>
                    {/* <NavLink to="/logout">
                        Logout
                    </NavLink> */}
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;