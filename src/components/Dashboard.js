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
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Cansat Altitude (m)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#0075cc"
            }
        ]
    })

    const [tempGraph, setTempGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Temperature (C)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#e8001a"
            }
        ]
    })

    const [humGraph, setHumGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Humidity (%)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#07b200"
            }
        ]
    })

    const [barGraph, setBarGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Barometric Pressure (kPa)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#cbb800"
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

            var tmpAlt1={...tempGraph}
            tmpAlt1['datasets'][0].data=arrayRotate(tmpAlt1['datasets'][0].data)
            tmpAlt1['datasets'][0].data[tmpAlt1['datasets'][0].data.length-1]=data.temp
            setTempGraph(tmpAlt1)

            var tmpAlt2={...humGraph}
            tmpAlt2['datasets'][0].data=arrayRotate(tmpAlt2['datasets'][0].data)
            tmpAlt2['datasets'][0].data[tmpAlt2['datasets'][0].data.length-1]=data.hum
            setHumGraph(tmpAlt2)

            var tmpAlt3={...barGraph}
            tmpAlt3['datasets'][0].data=arrayRotate(tmpAlt3['datasets'][0].data)
            tmpAlt3['datasets'][0].data[tmpAlt3['datasets'][0].data.length-1]=data.bar
            setBarGraph(tmpAlt3)

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
            <Grid style={{height:'33vh'}} item xs={12} md={4}>
                <Grid container spacing={1} >
                    <Grid style={{height:'33vh'}} item xs={12}>
                        <Line data={tempGraph} options={{
                            maintainAspectRatio: false,
                        }}/>
                    </Grid>
                    <Grid style={{height:'33vh'}} item xs={12}>
                        <Line data={humGraph} options={{
                            maintainAspectRatio: false,
                        }}/>
                    </Grid>
                    <Grid style={{height:'33vh'}} item xs={12}>
                        <Line data={barGraph} options={{
                            maintainAspectRatio: false,
                        }}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard