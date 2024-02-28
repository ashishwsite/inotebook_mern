
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';

import Login from './components/Login'
import Signup from './components/Singup';
import Alert from "./components/Alert";
import {  useState } from "react";

function App() {
const [alert,setalert]=useState({display:"none",mess:"this is starting message "});


  return (
    <>
    {/* NoteState is cotext provider so we make its wraper ,so can other componet acces the data from context */}
      <NoteState>
        <Router>
          <Navbar   /> 
          <Alert  alert={alert} /> 
          <div className="container">
            <Routes >
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}> </Route>
              <Route exact path="/login" element={<Login  alertshow={{alert,setalert}}/>}>  </Route>
              <Route exact path="/signup" element={<Signup  />}>  </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
