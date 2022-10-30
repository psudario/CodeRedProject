import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


import { Colors, SecondaryColors } from "../../ColorPallete";

export const NavbarWrapper = styled.div`
    grid-area: Navbar;
    background-color: ${Colors.Color3};
    padding-top: 50px;
`;


export const NavbarTitle = styled.h1`
    text-align: center;
    cursor: pointer;
    margin-bottom: 10vh;
`;

export const NavLinksWrapper = styled.div`
    padding-left: 3vw;
`;

export const NavLinkWrapper = styled.div`
    margin-bottom: 20px;
`;

export const NavLink = styled(Link)`
    color: ${Colors.Color1};
    font-size: 25px;
    font-weight: bold;
    text-decoration: none;
    
`;