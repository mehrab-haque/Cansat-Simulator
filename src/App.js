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

        <Routes>
            <Route path="/" exact element={<Missions />} />
            <Route path="/mission/:id" exact element={<SingleMission />} />
            <Route path="/data" exact element={<Dashboard />} />
            <Route path="/simulator" exact element={<Simulator />} />
        </Routes>

      </div>
  );
}

export default App;
export {showToast}