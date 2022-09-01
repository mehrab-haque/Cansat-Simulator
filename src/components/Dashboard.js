import React, {useEffect, useState} from 'react'
import { Line } from "react-chartjs-2";
import {Grid} from "@mui/material";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { getDatabase, ref, onValue} from "firebase/database";



const Dashboard=props=>{
    const db = getDatabase();
    const dbRef = ref(db);

    const [altitudeGraph, setAltitudeGraph]=useState({
        labels: ["t+14", "t+13", "t+12","t+11","t+10","t+8","t+7","t+7","t+6","t+5","t+4","t+3","t+2","t+1","t"],
        datasets: [
            {
                label: "Cansat Altitude",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#742774"
            }
        ]
    })

    function arrayRotate(arr, reverse) {
        if (reverse) arr.unshift(arr.pop());
        else arr.push(arr.shift());
        return arr;
    }

    useEffect(()=>{
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            var tmpAlt={...altitudeGraph}
            tmpAlt['datasets'][0].data=arrayRotate(tmpAlt['datasets'][0].data)
            tmpAlt['datasets'][0].data[tmpAlt['datasets'][0].data.length-1]=data.altitude
            setAltitudeGraph(tmpAlt)
        },error=>{
            console.log(error)
        });
        // setInterval(() => {
        //
        // }, 1000);
    },[])


    return(
        <Grid container spacing={1} >
            <Grid style={{height:'100vh'}} item xs={12} md={8}>
                <Line data={altitudeGraph} options={{
                    maintainAspectRatio: false,
                }}/>
            </Grid>
        </Grid>
    )
}

export default Dashboard