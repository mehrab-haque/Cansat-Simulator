import React from 'react'
import {Grid, Paper, Slider, Typography} from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";


const Simulator=props=>{
    const db = getDatabase();

    const handleAltChange=(e,val)=>{
        set(ref(db), {
            altitude:val
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

        </Grid>
    )
}

export default Simulator