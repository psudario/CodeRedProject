import React from "react";

import {
    FooterWrapper
} from "./Footer.styles.js";

const Footer = () => {
    return (
        <FooterWrapper style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <p style={{color:"white"}}>This is a footers</p>
        </FooterWrapper>
    );
}

export default Footer;