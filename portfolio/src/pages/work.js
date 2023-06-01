import React, { useState, useEffect } from "react";
import { GenerateAllWork } from "../components";

const Work = () => {
  return (
    <div className="main-body center">
      <h1 className="big-intro-text text-left">Here's more of my</h1>
      <div>
        <p className="big-Danfo-text">WORK</p>
      </div>
      <h1 className="big-intro-text text-right">(if you're interested 🙈)</h1>
      <div className="line-break"></div>
      <h3>
        <a href="#all-work-section">↓ everything</a>
      </h3>
      <div className="line-break"></div>
      <div className="works-section" id="all-work-section">
        <GenerateAllWork />
      </div>
      <div className="line-break"></div>
    </div>
  );
};

export default Work;
