import React, {useEffect, useState} from 'react'
import {Grid, Paper, Typography} from "@mui/material";
import {Audio} from "react-loader-spinner";
import {collection, query, where, getDocs, getFirestore, orderBy} from "firebase/firestore";
import {Link} from "react-router-dom";


const Missions=props=>{

    const firstore=getFirestore()

    const [missions,setMissions]=useState(null)

    const fetchMissions=async ()=>{
        const q = query(collection(firstore, "missions"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        var tmp=[]
        querySnapshot.forEach((doc) => {
            tmp.push({
                ...doc.data(),
                id:doc.id
            })
        });
        setMissions(tmp)
        console.log(tmp)
    }

    useEffect(()=>{
        fetchMissions()
    },[])

    if(missions===null)
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
        <Grid conatiner spacing={1} padding={1}>
            {/*<Grid item xs={12}>*/}
            {/*    <Typography variant={'h3'}>*/}
            {/*        All Missions*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}
            <Grid item xs={6}>
                <Link to={'/data'}>
                    <Paper style={{padding:'20px',backgroundColor:'rgba(105,196,0,0.87)'}}>
                        <Typography variant={'h5'} style={{color:'white'}}>
                            <center>
                                + Add a new mission
                            </center>
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
            {
                missions.map(m=>{
                    return(
                        <Grid item xs={3} md={3}>
                            <Link to={`/mission/${m.id}`}>
                                <Paper style={{padding:'20px',marginTop:'10px',backgroundColor:'#0090ff22'}}>
                                    <Typography variant={'h5'}>
                                        {m.title}
                                     </Typography>
                                    <Typography variant={'h6'} color={'primary'}>
                                        {m.description}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        Date : {m.date}
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        Location : {m.location}
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default Missions