import React, { useState, useEffect, useRef } from "react";
import { SetVisibleVenn, GenerateVennOfMe } from "../components";

const Me = () => {
  return (
    <div className="main-body center">
      <h1 className="big-intro-text text-left">And if you wanna learn</h1>
      <div>
        <p className="big-Danfo-text">ABOUT ME</p>
      </div>
      <h1 className="big-intro-text text-right"> scroll for a story</h1>
      <div className="line-break"></div>
      <h3>
        <a href="#all-about-me-section">↓ all about me</a>
      </h3>
      <div className="line-break"></div>
      <div className="me-section" id="all-about-me-section">
        <div className="me-writeup-section">
          <h4 className="me-writeup me-part-1">
            When I was younger, I spent all my free time{" "}
            <span className="highlighted-text">making things</span>. Building
            houses in The Sims and Minecraft made me want to be an architect or
            interior designer, but building worlds through stories made me want
            to write.
          </h4>
          <h4 className="me-writeup me-part-2">
            Then through school I fell in love with Maths and Physics. I loved{" "}
            <span className="highlighted-text">solving problems</span> - which
            pointed to engineering. I studied mechanical engineering for a
            little while at uni, and interned in energy optimisation.
          </h4>
          <h4 className="me-writeup me-part-3">
            But I missed the joy of creating boundlessly. I dabbled in music
            journalism and product design and discovered how to{" "}
            <span className="highlighted-text">channel my thoughts</span> into
            sound, design and language.
          </h4>
          <h4 className="me-writeup me-part-3">
            Then I started studying a BASc degree and learned to channel my
            thoughts into <span className="highlighted-text">everything</span>.
            I majored in computer science and applied storytelling and found my
            sweet spot.
          </h4>
          <h4 className="me-writeup me-part-3">
            Now? I’m a committed generalist (finally lol). <br />
            <span className="highlighted-text">
              I love making things to solve problems and communicate ideas
              delightfully.
            </span>{" "}
            <br />
            I’m very interested in almost everything.
          </h4>
        </div>
        <div className="me-data">
          <GenerateVennOfMe/>
          SetVisibleVenn(["words-circle"])
        </div>
      </div>
    </div>
  );
};

export default Me;
