import React from 'react'
import { Line } from "react-chartjs-2";
import {Grid} from "@mui/material";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'


const Dashboard=props=>{



    const data = {
        labels: ["t", "t+10", "t+20","t+30","t+40","t+50","t+60","t+70","t+80","t+90","t+100","t+110","t+120","t+130","t+140","t+150"],
        datasets: [
            {
                label: "Expected Altitude",
                data: [0,20,36,50,62,72,80,85,84,80,70,55,35,15,0],
                fill: false,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Cansat Altitude",
                data: [0,22,40,56,66,74,82,85,83,75,65,40,20,5,0],
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    return(
        <Grid container spacing={1} >
            <Grid style={{height:'100vh'}} item xs={12} md={8}>
                <Line data={data} options={{
                    maintainAspectRatio: false,
                }}/>
            </Grid>
        </Grid>
    )
}

export default Dashboard