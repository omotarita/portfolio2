import React, { useState, useEffect } from "react";
import { GenerateSelectedWork } from "../components";

const Home = () => {
  return (
    <div className="main-body center">
      <h1 className="big-intro-text text-left">Hi, I'm</h1>
      <div>
        <p className="big-Danfo-text">Omotara</p>
      </div>
      <h1 className="big-intro-text text-right">
        and I'm a{/* <SelectAutoWidth /> */}
      </h1>
      <div className="line-break"></div>
      <h3>
        <a href="#selected-work-section">↓ selected work</a>
      </h3>
      <div className="line-break"></div>
      <div id="selected-work-section">
        <GenerateSelectedWork />
        <div className="line-break"></div>
      </div>
    </div>
  );
};

export default Home;
