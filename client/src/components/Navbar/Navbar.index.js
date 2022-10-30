import React from "react";

import {
    NavbarWrapper,
    NavbarTitle,
    NavLinksWrapper,
    NavLinkWrapper,
    NavLink
} from "./Navbar.styles.js";
import {Link} from "react-router-dom";

const Navbar = (props) => {
    return (
        <NavbarWrapper>
            <NavbarTitle>Good Ol' Boy</NavbarTitle>
            <NavLinksWrapper>
                <NavLinkWrapper>
                    <NavLink to="/">Overview</NavLink>
                </NavLinkWrapper>
                <NavLinkWrapper>
                    <NavLink>Company</NavLink>
                </NavLinkWrapper>
                <NavLinkWrapper>
                    <NavLink to="Page2">Eco</NavLink>
                </NavLinkWrapper>
            </NavLinksWrapper>
        </NavbarWrapper>
    );
}

export default Navbar;