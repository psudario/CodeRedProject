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

import { Colors, SecondaryColors } from "../../ColorPallete.js";



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






const Dashboard = () => {
    const [currOilPrice, setCurrOilPrice] = useState(0);
    const [currOilPriceChange, setCurrOilPriceChange] = useState(0);
    const [oilData, setOilData] = useState({});
    const [oilNewsData, setOilNewsData] = useState([]);

    useEffect(() => {
        
        const fetchOilPrices = async () => {
            let data = [];
            let req1 = await axios({
                method: 'GET',
                url: 'https://api.oilpriceapi.com/v1/prices/past_year?by_code=WTI_USD&by_type=daily_average_price',
                headers: {
                    'Authorization': 'Token 6373332452363f7f6e52386e18604881',
                    'Content-Type': 'application/json'
                },
                params: {
                    by_type: 'daily_average_price',
                    page: `${1}`
                }
            })
            
            data = [...data, req1]
            const total = req1.headers.total;
            const per_page = req1.headers["per-page"];
            const n = Math.ceil(total/per_page);
            for(let i = 2; i <= n; i++){
                let reqn = await axios({
                    method: 'GET',
                    url: 'https://api.oilpriceapi.com/v1/prices/past_year?by_code=WTI_USD&by_type=daily_average_price',
                    headers: {
                        'Authorization': 'Token 43d6af8aaf931b4a5d237f9649c5eb0c',
                        'Content-Type': 'application/json'
                    },
                    params: {
                        by_type: 'daily_average_price',
                        page: `${i}`
                    }
                });
                data = [...data, reqn];
            }
            
            // Categorize the data by month
            let simplifiedData = [...data.map(obj => {return obj.data.data.prices})];
            let responses = [];
            for(let i = 0; i < simplifiedData.length; i++){
                responses = [...responses, ...simplifiedData[i]];
            }

            let monthsDictionary = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Deceber"];
            let totalMonths = 1;
            let currMonth = (new Date(responses[0].created_at)).getMonth();
            let totalOilMonthly = 0;
            let totalEntriesMonthly = 0;
            let returnData = [];
            let returnLabels = [];
            for(let i = 0; (i < responses.length) && (totalMonths <= 12); i++){
                if(currMonth !== (new Date(responses[i].created_at)).getMonth()){
                    totalMonths += 1;
                    returnData = [...returnData, totalOilMonthly / totalEntriesMonthly]
                    returnLabels = [...returnLabels, monthsDictionary[currMonth]]


                    currMonth = (new Date(responses[i].created_at)).getMonth();
                    totalOilMonthly = 0;
                    totalEntriesMonthly = 1;
                }
                totalEntriesMonthly += 1;
                totalOilMonthly += responses[i].price;
            }

            setOilData({
                data: returnData,
                labels: returnLabels
            });
            setCurrOilPrice(responses[responses.length-1].price);
            setCurrOilPriceChange(responses[responses.length-1].price-responses[responses.length-2].price)
        }

        const fetchOilNews = async () => {
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
        }
        
        fetchOilPrices();
        fetchOilNews();
        
        }, []);

    
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Commodity Price vs. Time',
          },
        },
        
      };
      
      const labels = oilData.labels;
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Price of Oil',
            data: oilData.data,
            borderColor: Colors.Color1,
            backgroundColor: Colors.Color1,
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

    return (
            <DashboardWrapper>
                <h1 style={{marginBottom:"25px", marginLeft:"10px"}}>Overview</h1>
                <ChartsContainer1>
                    <SmallChartWrapper style={{gridArea: "chart1"}}>
                        <p style={{fontWeight: "bold"}}>Oil price</p>
                        <div style={{display:"flex"}}>
                            <PriceArrow priceChange={currOilPriceChange} />
                            <Price priceChange={2}> ${currOilPrice}</Price>
                        </div>
                    </SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart2"}}>
                        <p style={{fontWeight: "bold"}}>Natural Gas Price</p>
                        <div style={{display:"flex"}}>
                            <PriceArrow priceChange={2} />
                            <Price priceChange={2}> $21</Price>
                        </div>
                    </SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart3"}}>
                        <p style={{fontWeight: "bold"}}>Oil Production</p>
                        <div style={{display:"flex"}}>
                            <PriceArrow priceChange={2} />
                            <Price priceChange={2}> 21 M Barrels</Price>
                        </div>  
                    </SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart4"}}>
                        <p style={{fontWeight: "bold"}}>Natural Gas Production</p>
                        <div style={{display:"flex"}}>
                            <PriceArrow priceChange={2} />
                            <Price priceChange={2}> 21 MCF</Price>
                        </div>
                    </SmallChartWrapper>
                    <MainChartWrapper>
                        <Line options={options} data={data} />
                    </MainChartWrapper>
                </ChartsContainer1>


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