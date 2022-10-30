import React, {useState, useEffect} from "react";
import axios from "axios";

// Styled Components
import {
    DashboardWrapper,
    ChartContainer,
    ChartsContainer1,
    MainChartWrapper,
    SmallChartWrapper,
    ChartsContainer2,

    NewsWrapper,
    NewsCard,
    PriceArrow,
    Price,

} from "./Dashboard.styles.js";

// Chart Stuff
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { newsData } from "../../TestData/SampleNews.js";


import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );





export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Price of Oil',
        data: [233, 249, 322, 514, 872, 876, 968],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Price of Natural Gas',
        // Add Data Here
        data: [289, 862, 421, 551, 766, 957, 804],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      },
    ],
  };

const Dashboard = () => {
    const [count, setCount] = useState(0);
    const [oilChartData, setOilChartData] = useState([]);
    const [oilNewsData, setOilNewsData] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://oil-news-global.p.rapidapi.com/news',
            headers: {
              'X-RapidAPI-Key': '4d19490205msha79beac20e0eafcp1a47dfjsn6e48bdf22c11',
              'X-RapidAPI-Host': 'oil-news-global.p.rapidapi.com'
            }
        }).then(res => {
            setOilNewsData(res.data);
        });
    }, []);
    return (
            <DashboardWrapper>
                <h1 style={{marginBottom:"25px", marginLeft:"10px"}}>Overview</h1>
                <ChartsContainer1>
                    <SmallChartWrapper style={{gridArea: "chart1"}}>
                        <p>Oil price</p>
                        <PriceArrow priceChange={2} />
                        <Price priceChange={2}> $21</Price>
                    </SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart2"}}></SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart3"}}></SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart4"}}></SmallChartWrapper>
                    <MainChartWrapper>
                        <Line options={options} data={data} />
                    </MainChartWrapper>
                </ChartsContainer1>
                <ChartsContainer2>
                    <SmallChartWrapper style={{gridArea: "chart5"}}></SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart6"}}></SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart7"}}></SmallChartWrapper>
                </ChartsContainer2>


                <NewsWrapper style={{"&::-webkit-scrollbar" : {display: "none"}}}>
                    {
                        oilNewsData.map((data) => {
                            return(
                                <NewsCard onClick={()=>{window.location.replace(data.url)}}>
                                    <h4 style={{fontWeight: "lighter", marginBottom:"15px"}}>
                                        {(data.title.length < 150) ? 
                                            data.title : 
                                            data.title.substr(0, 147) + "..."
                                        }
                                    </h4>
                                    <p style={{fontWeight:"bold"}}>{data.source}</p>
                                </NewsCard>
                            );
                        })
                    }
                </NewsWrapper>
            </DashboardWrapper>
            
    );
}

export default Dashboard;