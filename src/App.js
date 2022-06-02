import React,{useState} from "react";
import { Routes, Route } from "react-router-dom";

import "./components/events/Event.css";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import About from "./components/about";
import NoteState from "./context/events/eventState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container" style={{ marginTop: "25px" }}>
          <Routes>
            <Route path="/" index element={<Home showAlert={showAlert} />} />
            <Route
              path="/home"
              index
              element={<Home showAlert={showAlert} />}
            />
            <Route path="/about" index element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
};

export default App;
