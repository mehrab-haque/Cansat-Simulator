import React from 'react'
import {Grid, Paper, Slider, Typography} from "@mui/material";
import { getDatabase, ref, set,update } from "firebase/database";


const Simulator=props=>{
    const db = getDatabase();

    const handleAltChange=(e,val)=>{
        update(ref(db), {
            altitude:val
        });
    }

    const handleTempChange=(e,val)=>{
        update(ref(db), {
            temp:val
        });
    }

    const handleHumidityChange=(e,val)=>{
        update(ref(db), {
            hum:val
        });
    }

    const handleBarChange=(e,val)=>{
        update(ref(db), {
            bar:val
        });
    }

    return(
        <Grid container spacing={2} padding={2}>
            <Grid item md={4} xs={12}>
                <Paper style={{padding:'10px'}}>
                    <Typography variant={'h6'}>
                        <center>
                            Altitude (m)
                        </center>
                        <div>
                            <Slider
                                aria-label="Always visible"
                                defaultValue={80}
                                step={1}
                                onChangeCommitted={handleAltChange}
                                valueLabelDisplay={"on"}
                            />
                        </div>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Paper style={{padding:'10px'}}>
                    <Typography variant={'h6'}>
                        <center>
                            Temmperature (Celcius)
                        </center>
                        <div>
                            <Slider
                                aria-label="Always visible"
                                defaultValue={80}
                                step={1}
                                onChangeCommitted={handleTempChange}
                                valueLabelDisplay={"on"}
                            />
                        </div>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Paper style={{padding:'10px'}}>
                    <Typography variant={'h6'}>
                        <center>
                            Humidity (%)
                        </center>
                        <div>
                            <Slider
                                aria-label="Always visible"
                                defaultValue={80}
                                step={1}
                                onChangeCommitted={handleHumidityChange}
                                valueLabelDisplay={"on"}
                            />
                        </div>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
                <Paper style={{padding:'10px'}}>
                    <Typography variant={'h6'}>
                        <center>
                            Pressure (kPa)
                        </center>
                        <div>
                            <Slider
                                aria-label="Always visible"
                                defaultValue={80}
                                step={1}
                                onChangeCommitted={handleBarChange}
                                valueLabelDisplay={"on"}
                            />
                        </div>
                    </Typography>
                </Paper>
            </Grid>

        </Grid>
    )
}

export default Simulator