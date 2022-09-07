import React, {useEffect, useRef, useState} from 'react'
import { Line } from "react-chartjs-2";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { getDatabase, ref, onValue} from "firebase/database";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import BallotIcon from '@mui/icons-material/Ballot';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import {Link, useNavigate, useParams} from 'react-router-dom'
import {showToast} from "../App";
import {collection,orderBy,addDoc, getFirestore,doc,getDoc} from "firebase/firestore";
import {Audio} from "react-loader-spinner";




const SingleMission=props=>{

    const {id}=useParams()

    const firstore=getFirestore()

    const navigate=useNavigate()

    const [dialog,setDialog]=useState(false)
    const [data,setData]=useState(null)



    const fetchData=async ()=>{
        const docRef = doc(firstore, "missions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data())
        } else {
            showToast("Mission does not exist")
            navigate("/")
        }
    }


    useEffect(()=>{
        fetchData()
    },[])

    if(data===null)
        return(
            <div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="#0090ff"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        )
    return(
        <div>
            <Dialog open={dialog} onClose={()=>{setDialog(false)}}>
                <DialogTitle>
                    Mission Details
                </DialogTitle>
                <DialogContent>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}>
                                {data.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>
                                {data.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>
                                Date : {data.date}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>
                                Location : {data.location}
                            </Typography>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button
                        color={'secondary'}
                        onClick={()=>{setDialog(false)}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <div style={{display:'flex',padding:'10px'}}>
                        <Fab onClick={()=>{setDialog(true)}} style={{marginRight:'10px'}} variant="extended" color={'primary'}>
                            <SaveAsIcon sx={{ mr: 1 }} />
                            Description
                        </Fab>
                        <Link to={'/'}>
                            <Fab  style={{marginRight:'10px'}} variant="extended">
                                <BallotIcon sx={{ mr: 1 }} />
                                All Missions
                            </Fab>
                        </Link>
                    </div>
                </Grid>
                <Grid style={{height:'100vh'}} item xs={12} md={8}>
                    <Line data={JSON.parse(data.data.alt)} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Grid container spacing={1} >
                        <Grid style={{height:'33vh'}} item xs={12}>
                            <Line data={JSON.parse(data.data.temp)} options={{
                                maintainAspectRatio: false,
                            }}/>
                        </Grid>
                        <Grid style={{height:'33vh'}} item xs={12}>
                            <Line data={JSON.parse(data.data.hum)} options={{
                                maintainAspectRatio: false,
                            }}/>
                        </Grid>
                        <Grid style={{height:'33vh'}} item xs={12}>
                            <Line data={JSON.parse(data.data.bar)} options={{
                                maintainAspectRatio: false,
                            }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={JSON.parse(data.data.accX)} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={JSON.parse(data.data.accY)} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
                <Grid style={{height:'33vh'}} item xs={12} md={4}>
                    <Line data={JSON.parse(data.data.accZ)} options={{
                        maintainAspectRatio: false,
                    }}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default SingleMission