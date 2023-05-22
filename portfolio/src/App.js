import React, { useState, useEffect } from "react";
import "./fonts/DanfoStd.otf";
import "./App.css";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
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

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const json_file = await response.json();

        setData(Object.values(json_file)[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};

export function GenerateProjectContent() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no! Something's gone wrong 💔</p>;
  console.log(data);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {data.map((project) => (
        <div key={project.id} className="project-card">
          <div
            className="project-preview"
            // style="backgroundColor: {project.bgcolour}"
          >
            <div className="project-thumbnail">
              {/* <img
                src={
                  "http://localhost:1337" +
                  project.attributes.Media.data.attributes.formats.large.url
                }
                className="project-photo"
              /> */}
              <div className="overlay FadeEffect">
                <h4 className="project-slogan">{project.attributes.Slogan}</h4>
              </div>
            </div>
          </div>
          <h3 className="project-title">{project.attributes.Title}</h3>
        </div>
      ))}
    </Grid>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-navbar">
        <div>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width-device-width, initial-scale=1" />
          <ul class="container nav-styles">
            <div class="logo">
              <a href="App.js">🫣</a>
            </div>
            <div class="nav-items item-spacing">
              <a href="work.js">WORK.</a>
            </div>
            <div class="nav-items item-spacing">
              <a href="https://logically.webflow.io/">PLAY.</a>
            </div>
            <div class="nav-items item-spacing">
              <a href="me.js">ME.</a>
            </div>
            <div class="nav-items item-spacing">
              <a href="mailto:omotarita@gmail.com?subject=I saw your portfolio and I wanna know you">
                CHAT.
              </a>
            </div>
          </ul>
        </div>
      </header>
      <body className="main-body center">
        <h1 className="big-intro-text text-left">Hi, I'm</h1>
        <div>
          <p className="big-Danfo-text">Omotara</p>
        </div>
        <h1 className="big-intro-text text-right">
          and I'm a
          {/* <SelectAutoWidth /> */}
        </h1>
        <div className="line-break"></div>
        <h3>
          <a href="#selected-work-section">↓ selected work</a>
        </h3>
        <div className="line-break"></div>
        <div id="selected-work-section">
          <GenerateProjectContent />
        </div>
      </body>
    </div>
  );
}

export default App;
