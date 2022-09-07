import React, {useEffect, useRef, useState} from 'react'
import { Line } from "react-chartjs-2";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, TextField} from "@mui/material";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { getDatabase, ref, onValue} from "firebase/database";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import BallotIcon from '@mui/icons-material/Ballot';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import {Link, useNavigate} from 'react-router-dom'
import {showToast} from "../App";
import {collection,orderBy,addDoc, getFirestore} from "firebase/firestore";




const Dashboard=props=>{
    const db = getDatabase();
    const firstore=getFirestore()
    const dbRef = ref(db);

    const navigate=useNavigate()

    const [dialog,setDialog]=useState(false)
    const [loading,setLoading]=useState(false)

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

    const [accXGraph, setAccXGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "X-Acceleration (m/s^2)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#cbb800"
            }
        ]
    })

    const [accYGraph, setAccYGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Y-Acceleration (m/s^2)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#cbb800"
            }
        ]
    })

    const [accZGraph, setAccZGraph]=useState({
        labels: ["t-14", "t-13", "t-12","t-11","t-10","t-8","t-7","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t"],
        datasets: [
            {
                label: "Z-Acceleration (m/s^2)",
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                fill: false,
                borderColor: "#cbb800"
            }
        ]
    })

    const titleRef=useRef()
    const descRef=useRef()
    const dateRef=useRef()
    const locRef=useRef()

    const saveClick=async ()=>{
        const title=titleRef.current.value.trim()
        const description=descRef.current.value.trim()
        const date=dateRef.current.value.trim()
        const location=locRef.current.value.trim()

        if(title.length===0)
            showToast("Mission title cannot be empty")
        else if(description.length===0)
            showToast("Mission description cannot be empty")
        else if(date.length===0)
            showToast("Mission date cannot be empty")
        else if(location.length===0)
            showToast("Mission location cannot be empty")
        else{
            var missionObject={
                title:title,
                description:description,
                date:date,
                location:location,
                timestamp:Date.now(),
                data:{
                    alt:JSON.stringify(altitudeGraph),
                    temp:JSON.stringify(tempGraph),
                    hum:JSON.stringify(humGraph),
                    bar:JSON.stringify(barGraph),
                    accX:JSON.stringify(accXGraph),
                    accY:JSON.stringify(accYGraph),
                    accZ:JSON.stringify(accZGraph)
                }
            }
            setLoading(true)
            await addDoc(collection(firstore, "missions"), missionObject);
            setLoading(false)
            showToast("Mission saved successfully")
            navigate("/")
        }
    }

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

            var tmpAlt4={...accXGraph}
            tmpAlt4['datasets'][0].data=arrayRotate(tmpAlt4['datasets'][0].data)
            tmpAlt4['datasets'][0].data[tmpAlt4['datasets'][0].data.length-1]=data.accx
            setAccXGraph(tmpAlt4)

            var tmpAlt5={...accYGraph}
            tmpAlt5['datasets'][0].data=arrayRotate(tmpAlt5['datasets'][0].data)
            tmpAlt5['datasets'][0].data[tmpAlt5['datasets'][0].data.length-1]=data.accy
            setAccYGraph(tmpAlt5)

            var tmpAlt6={...accZGraph}
            tmpAlt6['datasets'][0].data=arrayRotate(tmpAlt6['datasets'][0].data)
            tmpAlt6['datasets'][0].data[tmpAlt6['datasets'][0].data.length-1]=data.accz
            setAccZGraph(tmpAlt6)

        },error=>{
            console.log(error)
        });
        // setInterval(() => {
        //
        // }, 1000);
    },[])


    return(
        <div>
            <Dialog open={dialog} onClose={()=>{setDialog(false)}}>
                <DialogTitle>
                    Save Mission
                </DialogTitle>
                <DialogContent>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label={'Mission Title'}
                                inputRef={titleRef}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label={'Mission Description'}
                                multiline
                                rows={3}
                                inputRef={descRef}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label={'Date'}
                                inputRef={dateRef}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label={'Location'}
                                inputRef={locRef}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={loading}
                        color={'secondary'}
                        onClick={()=>{setDialog(false)}}>
                        Close
                    </Button>
                    <Button
                        disabled={loading}
                        color={'primary'}
                        onClick={saveClick}
                        >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <div style={{display:'flex',padding:'10px'}}>
                        <Fab onClick={()=>{setDialog(true)}} style={{marginRight:'10px'}} variant="extended" color={'primary'}>
                            <SaveAsIcon sx={{ mr: 1 }} />
                            Save Mission
                        </Fab>
                        <Link to={'/'}>
                            <Fab  style={{marginRight:'10px'}} variant="extended">
                                <BallotIcon sx={{ mr: 1 }} />
                                All Missions
                            </Fab>
                        </Link>
                        <Link to="/simulator" target="_blank" rel="noopener noreferrer">
                            <Fab variant="extended"  color={'secondary'}>
                                <SatelliteAltIcon sx={{ mr: 1 }} />
                                Simulator
                            </Fab>
                        </Link>
                    </div>
                </Grid>
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
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={accXGraph} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={accYGraph} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={accZGraph} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard