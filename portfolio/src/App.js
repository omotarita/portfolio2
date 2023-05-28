import React, { useState, useEffect } from "react";
import "./fonts/DanfoStd.otf";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./pages/home";
import Me from "./pages/me";
import Work from "./pages/work";
// require("dotenv").config();

// export function SelectAutoWidth() {
//   const [whatIAm, setWhatIAm] = React.useState("generalist");

//   const handleChange = (event) => {
//     setWhatIAm(event.target.value);
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 80 }}>
//       <Select
//         id="what-i-am"
//         value={whatIAm}
//         label="whatIAm"
//         onChange={handleChange}
//         autoWidth
//         inputProps={{ "aria-label": "Without label" }}
//       >
//         <MenuItem value={"generalist"}>generalist</MenuItem>
//         <MenuItem value={"writer"}>writer</MenuItem>
//         <MenuItem value={"product manager"}>product manager</MenuItem>
//         <MenuItem value={"creative technologist"}>
//           creative technologist
//         </MenuItem>
//       </Select>
//     </FormControl>
//   );
// }

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/me":
      component = <Me />;
      break;
    case "/work":
      component = <Work />;
      break;
  }
  return (
    <div className="App">
      <div className="page-container">
        <header className="App-navbar">
          <div>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width-device-width, initial-scale=1"
            />
            <Navbar />
          </div>
        </header>
        <div className="content-wrapper">{component}</div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
