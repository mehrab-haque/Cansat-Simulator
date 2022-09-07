import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Routes,
  Route, useNavigate
} from "react-router-dom";
import './config/firebaseConfig'
import Dashboard from "./components/Dashboard";
import Simulator from "./components/Simulator";
import Missions from "./components/Missions";
import SingleMission from "./components/SingleMission";
import {Grid,Typography} from "@mui/material";



var showToast;

function App() {



  showToast = message => {
    toast.dark(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
      <div>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        <a href={'https://spacelab.com.bd/'}>
            <center>
                <img src={'logo.png'} style={{
                    margin:'10px',
                    height:'80px'
                }}/>
            </center>
        </a>

        <Routes>
            <Route path="/" exact element={<Missions />} />
            <Route path="/mission/:id" exact element={<SingleMission />} />
            <Route path="/data" exact element={<Dashboard />} />
            <Route path="/simulator" exact element={<Simulator />} />
        </Routes>

          <Grid  style={{marginTop:'40px',marginBottom:'40px'}} container spacing={1}>
              <Grid style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
              }} item xs={12} md={6}>
                  <Typography variant={'h5'}>
                      <center >
                          This project is supported by<br/>
                          ICT Division<br/>
                          Ministry of Post Telecommunication and Information Technology<br/>
                          Government of the people republic of Bangladesh
                      </center>

                  </Typography>
              </Grid>
              <Grid style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
              }} item xs={12} md={6}>
                  <center >
                      <img src={'ict.png'} style={{
                          height:'200px'
                      }}/>
                  </center>
              </Grid>
          </Grid>

      </div>
  );
}

export default App;
export {showToast}