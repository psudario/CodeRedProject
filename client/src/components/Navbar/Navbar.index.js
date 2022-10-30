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
            <NavbarTitle>Ol' App</NavbarTitle>
            <NavLinksWrapper>
                <NavLinkWrapper>
                    <NavLink to="/">Overview</NavLink>
                </NavLinkWrapper>
                <NavLinkWrapper>
                    <NavLink>WO</NavLink>
                </NavLinkWrapper>
                <NavLinkWrapper>
                    <NavLink to="Page2">Leaf</NavLink>
                </NavLinkWrapper>
            </NavLinksWrapper>
        </NavbarWrapper>
    );
}

export default Navbar;