import React from "react";
import styled from "styled-components";

import { Colors, SecondaryColors } from "../../ColorPallete.js";


export const MainBody = styled.div``;
export const DashboardWrapper = styled.div`
    min-height: 50vh;
    padding: 20px;
    background-color : ${Colors.Color2};
    grid-area: Body;
`;

export const ChartsContainer1 = styled.div`
    min-height: 30vh;
    display: grid;
    grid-template-areas:
        "chart1 chart2 mainchart"
        "chart3 chart4 mainchart";
    grid-template-columns: auto auto 50vw;
`;

export const MainChartWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: mainchart;
`;

export const SmallChartWrapper = styled.div`
    background-color: ${SecondaryColors.Color3};
    border-radius: 25px;
    margin: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ChartsContainer2 = styled.div`
    display: grid;
    grid-template-areas: "chart5 chart6 chart7";
    grid-template-rows: 20vh;
`;


export const NewsWrapper = styled.div`
    width: 80vw;
    display: flex;
    overflow-y: auto;
    &::-webkit-scrollbar {
        background-color: grey;
        border-radius: 10px;
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb{
        color: black;
        background-color: black;
        border-radius: 10px;
    }
`;

export const NewsCard = styled.div`
    background-color: ${Colors.Color4};
    margin: 1px;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: left;
    min-width: 600px;
    cursor: pointer;

    border-radius: 5px;
    padding: 10px;
`;

export const PriceArrow = styled.div`
    ${(props) => { 
        return props.priceChange < 0 ? `
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            
            border-top: 15px solid red;
        ` : `
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            
            border-bottom: 15px solid green;
    `}}
`;

export const Price = styled.h1`
    font-size: 25px;
    color: ${props => { return props.priceChange < 0 ? "red" : "green" }};
`;
