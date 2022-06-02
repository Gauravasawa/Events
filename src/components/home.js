import React from 'react'
import Event from "./events/Event";


const Home = ({ showAlert }) => {
  return (
    <div>
      <div className="container">
        <Event showAlert={showAlert} />
      </div>
    </div>
  );
};

export default Home;
