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








const Dashboard = () => {
    let total = 0;
    const [ready, setReady] = useState(false);
    const [oilChartData, setOilChartData] = useState({data:[], labels:[]});
    const [oilNewsData, setOilNewsData] = useState([]);

    useEffect(() => {
        let currPage = 1;
        let maxPage = 1;

        const fetchOilPrices = async (page=1) => {
            await axios({
                method: 'GET',
                url: 'https://api.oilpriceapi.com/v1/prices/past_year?by_code=WTI_USD&by_type=daily_average_price',
                headers: {
                    'Authorization': 'Token 268eac307ba3c850170f9a28dc072bd2',
                    'Content-Type': 'application/json'
                },
                params: {
                    by_type: 'daily_average_price',
                    page: `${page}`
                }
            }).then(async ( res ) => {
                maxPage = Math.ceil(parseInt(res.headers.total) / 100);
                currPage += 1;
                const data = res.data.data.prices;
                const return_obj = {
                    data: [data.map(obj => {return obj.price})],
                    labels: [data.map(obj => {return (new Date(obj.created_at)).getMonth()})]
                }
                return return_obj;
            }).then(async(data) => {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let obj = {
                    data:[],
                    labels:[]
                }
                let currMonth = data.labels[0][0];
                let totalMonths = 1;
                
                let totalMonthlyOil = 0;
                let totalMonthlyEntries = 0;

                for(let i = 0; (i < data.data[0].length) && (totalMonths < 13); i++){
                    if(data.labels[0][i] != currMonth){
                        // add to obj
                        obj.data = [...obj.data, totalMonthlyOil/totalMonthlyEntries]
                        obj.labels = [...obj.labels, currMonth];
                        // incrememnt month and reset
                        totalMonths += 1;
                        totalMonthlyEntries = 0;
                        totalMonthlyOil = 0;
                        currMonth = data.labels[0][i];
                    }
                    totalMonthlyEntries += 1;
                    totalMonthlyOil += data.data[0][i]
                }
                setOilChartData({
                    data:[...oilChartData.data, ...obj.data],
                    labels:[...oilChartData.labels, ...obj.labels],
                });
            }).then(()=>{
                if(currPage <= maxPage){
                    fetchOilPrices(currPage);
                }
            });
            
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
        
        fetchOilPrices(currPage);
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
            text: 'Chart.js Line Chart',
          },
        },
        
      };
      
      const labels = oilChartData.labels;
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Price of Oil',
            data: oilChartData.data,
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

      console.log(oilChartData);
    return (
            <DashboardWrapper>
                <h1 style={{marginBottom:"25px", marginLeft:"10px"}}>Overview</h1>
                <ChartsContainer1>
                    <SmallChartWrapper style={{gridArea: "chart1"}}>
                        <p>Oil price</p>
                        <PriceArrow priceChange={2} />
                        <Price priceChange={2}> $21</Price>
                    </SmallChartWrapper>
                    <SmallChartWrapper style={{gridArea: "chart2"}}>
                        <p>Natural Gas Price</p>
                        <PriceArrow priceChange={2} />
                        <Price priceChange={2}> $21</Price>
                    </SmallChartWrapper>
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