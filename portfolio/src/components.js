import React, { useState, useEffect, useRef } from "react";
import { SimpleGrid, position } from "@chakra-ui/react";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useSpring, animated } from "@react-spring/web";

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const json_file = await response.json();

        setData(json_file.data);
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

export function GatherFromCMS() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/projects?populate=*"
  );

  return data;
}

export function GenerateSelectedWork() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/projects?populate=*"
  );

  console.log("I'm about to log out this database :)");
  console.log(data);

  if (loading) return <p>Loading...</p>;
  console.log(error);
  if (error) return <p>Oh no! Something's gone wrong 💔 {error.message}</p>;

  return (
    <SimpleGrid className="project-grid" minChildWidth="363px" spacing="40px">
      {data.map((project) => {
        if (project.attributes.SelectedWork === true) {
          return (
            <a href={"/post/" + project.id}>
              <div key={project.id} className="project-card">
                <div
                  className="project-preview"
                  style={{ backgroundColor: project.attributes.BGColour }}
                >
                  <div className="project-thumbnail">
                    <img
                      src={
                        "http://localhost:1337" +
                        project.attributes.Thumbnail.data.attributes.formats
                          .large.url
                      }
                      className="project-photo"
                    />
                    <div className="overlay FadeEffect">
                      <h4 className="project-slogan">
                        {project.attributes.Slogan}
                      </h4>
                    </div>
                  </div>
                </div>
                <h1 className="project-title thickOutlined">{project.attributes.Title}</h1>
              </div>
            </a>
          );
        }
        return null;
      })}
    </SimpleGrid>
  );
}

export function GenerateAllWork() {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/projects?populate=*"
  );

  console.log("I'm about to log out this database :)");
  console.log(data);

  if (loading) return <p>Loading...</p>;
  console.log(error);
  if (error) return <p>Oh no! Something's gone wrong 💔 {error.message}</p>;

  return (
    <SimpleGrid className="project-grid" minChildWidth="363px" spacing="40px">
      {data.map((project) => {
        return (
          <a href={"/post/" + project.id}>
            <div key={project.id} className="project-card">
              <div
                className="project-preview"
                style={{ backgroundColor: project.attributes.BGColour }}
              >
                <div className="project-thumbnail">
                  <img
                    src={
                      "http://localhost:1337" +
                      project.attributes.Thumbnail.data.attributes.formats.large
                        .url
                    }
                    className="project-photo"
                  />
                  <div className="overlay FadeEffect">
                    <h4 className="project-slogan">
                      {project.attributes.Slogan}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="project-headline">
                {project.attributes.mediums.data.map((medium) => (
                  <span
                    className="medium-tag"
                    style={{ backgroundColor: medium.attributes.Colour }}
                  >
                    <h4 className="medium-title">{medium.attributes.Name}</h4>
                  </span>
                ))}
                <span className="project-title thickOutlined">
                  {project.attributes.Title}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </SimpleGrid>
  );
}

const positions = { x: 480, y: 480, r: 180 };

export function GenerateVennOfMe() {
  const { data } = useFetch("http://localhost:1337/api/projects?populate=*");

  const Venn = () => {
    const ref = useRef();
    return (
      <svg
        preserveAspectRatio="xMaxYMid meet"
        viewBox="0 0 729 700"
        style={{
          width: "40vw",
          height: "100vh",
          border: "2px solid gold",
        }}
      >
        <circle
          id="words-circle"
          cx={positions.x}
          cy={positions.y}
          r={positions.r}
          fill="cornflowerblue"
          opacity={0.5}
        />
        <text id="words-text" x={positions.x + 30} y={positions.y + 30}>
          Words
        </text>
        <circle
          id="data-circle"
          cx={positions.x - positions.r * 1.1666666666}
          cy={positions.y - positions.r * 1.1666666666}
          r={positions.r}
          fill="cornflowerblue"
          opacity={0.5}
        />
        <text
          id="data-text"
          x={positions.x - positions.r * 1.48}
          y={positions.y - positions.r * 1.1666666666 - 30}
        >
          Data
        </text>
        <circle
          id="arts-circle"
          cx={positions.x}
          cy={positions.y - positions.r * 1.1666666666}
          r={positions.r}
          fill="cornflowerblue"
          opacity={0.5}
        />
        <text
          id="arts-text"
          x={positions.x + 30}
          y={positions.y - positions.r * 1.1666666666 - 30}
        >
          Arts
        </text>
        <circle
          id="tech-circle"
          cx={positions.x - positions.r * 1.1666666666}
          cy={positions.y}
          r={positions.r}
          fill="cornflowerblue"
          opacity={0.5}
        />
        <text
          id="tech-text"
          x={positions.x - positions.r * 1.48}
          y={positions.y + 30}
        >
          Tech
        </text>
      </svg>
    );
  };

  return (
    <div>
      <Venn />
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function SetVisibleVenn(wantedCircles) {
  const allCircles = [
    "words-circle",
    "data-circle",
    "tech-circle",
    "arts-circle",
  ];
  const allText = ["words-text", "data-text", "tech-text", "arts-text"];

  const AnimatedCircles = () => {
    const [visibleCircles, setVisibleCircles] = useState(GenerateVennOfMe());

    useInterval(() => {
      setVisibleCircles(GenerateVennOfMe());
    }, 2000);

    return (
      <svg viewBox="0 0 100 20">
        {allCircles.map((circle) => (
          <AnimatedCircle
            key={circle}
            index={circle}
            isShowing={visibleCircles.includes(circle)}
          />
        ))}
      </svg>
    );
  };

  const AnimatedCircle = ({ index, isShowing }) => {
    const wasShowing = useRef(false);

    useEffect(() => {
      wasShowing.current = isShowing;
    }, [isShowing]);

    const style = useSpring({
      config: {
        duration: 1200,
      },
      r: isShowing ? positions.r : 0,
      opacity: isShowing ? 0.5 : 0,
    });

    return (
      <animated.circle
        {...style}
        // cx={index * 15 + 10}
        // cy="10"
        fill={
          !isShowing
            ? "tomato"
            : !wasShowing.current
            ? "cornflowerblue"
            : "lightgrey"
        }
      />
    );
  };
}

// export function SetVisibleVenn() {
//   const Svg = () => {
//     return (
//       <svg
//         preserveAspectRatio="xMaxYMid meet"
//         viewBox="0 0 729 700"
//         style={{
//           width: "40vw",
//           height: "100vh",
//           border: "2px solid gold",
//         }}
//       />
//     );
//   };

//   const Venn = () => {
//     const positions = { x: 480, y: 480, r: 180 };

//     useEffect(() => {
//       const svg = d3.select("svg");
//       svg.selectAll("*").remove();
//     }, []);

//     const style = useSpring({
//       config: {
//         duration: 1200,
//       },
//       r: isShowing ? positions.r : 0,
//       opacity: isShowing ? 0.5 : 0,
//     })

//     return (
//       <svg
//         preserveAspectRatio="xMaxYMid meet"
//         viewBox="0 0 729 700"
//         style={{
//           width: "40vw",
//           height: "100vh",
//           border: "2px solid gold",
//         }}
//       >
//         <circle
//           cx={positions.x}
//           cy={positions.y}
//           // r={positions.r}
//           fill="cornflowerblue"
//           // opacity={0.5}
//         />
//         <text x={positions.x + 30} y={positions.y + 30}>
//           Words
//         </text>
//       </svg>
//     );
//   };

//   return (
//     <div>
//       <Svg />
//       <Venn />
//     </div>
//   );
// }

// export function GenerateSecondVenn() {
//   const Venn = () => {
//     const ref = useRef();
//     const positions = { x: 480, y: 480, r: 180 };
//     useEffect(() => {
//       const svgElement = d3.select(ref.current);
//       svgElement
//         .selectAll("circle")

//         .join((enter) =>
//           enter
//             .append("circle")
//             .attr("cx", (d) => d * 15 + 10)
//             .attr("cy", 10)
//             .attr("r", 0)
//             .attr("fill", "cornflowerblue")
//             .append("text")
//             .attr("x", positions.x - positions.r * 1.48)
//             .attr("y", positions.y + 30)
//             .text("Data")
//             .call((enter) =>
//               enter
//                 .transition()
//                 .duration(1200)
//                 .attr("cy", 10)
//                 .attr("r", 6)
//                 .style("opacity", 1)
//             )
//         );
//     }, []);
//     return <svg viewBox="0 0 100 50" ref={ref} />;
//   };

//   return (
//     <div>
//       <Venn />
//     </div>
//   );
// }

// export function GenerateVennOfMe() {
//   const { data } = useFetch("http://localhost:1337/api/projects?populate=*");

//   const Svg = () => {
//     return (
//       <svg
//         preserveAspectRatio="xMaxYMid meet"
//         viewBox="0 0 729 700"
//         style={{
//           width: "40vw",
//           height: "100vh",
//           border: "2px solid gold",
//         }}
//       />
//     );
//   };

//   const Venn = () => {
//     const ref = useRef();
//     const positions = { x: 480, y: 480, r: 180 };
//     useEffect(() => {
//       const svgElement = d3.select("svg");
//       svgElement.selectAll("*").remove();
//       svgElement
//         .append("circle")
//         .attr("cx", positions.x)
//         .attr("cy", positions.y)
//         .attr("r", positions.r)
//         .attr("fill", "#69a3b2")
//         .attr("opacity", 0.5);
//       svgElement
//         .append("text")
//         .attr("x", positions.x + 30)
//         .attr("y", positions.y + 30)
//         .text("Words");
//       svgElement
//         .append("circle")
//         .attr("cx", positions.x - positions.r * 1.1666666666)
//         .attr("cy", positions.y - positions.r * 1.1666666666)
//         .attr("r", positions.r)
//         .attr("fill", "#69a3b2")
//         .attr("opacity", 0.5);
//       svgElement
//         .append("text")
//         .attr("x", positions.x - positions.r * 1.48)
//         .attr("y", positions.y - positions.r * 1.1666666666 - 30)
//         .text("Arts");
//       svgElement
//         .append("circle")
//         .attr("cx", positions.x)
//         .attr("cy", positions.y - positions.r * 1.1666666666)
//         .attr("r", positions.r)
//         .attr("fill", "#69a3b2")
//         .attr("opacity", 0.5);
//       svgElement
//         .append("text")
//         .attr("x", positions.x + 30)
//         .attr("y", positions.y - positions.r * 1.1666666666 - 30)
//         .text("Tech");
//       svgElement
//         .append("circle")
//         .attr("cx", positions.x - positions.r * 1.1666666666)
//         .attr("cy", positions.y)
//         .attr("r", positions.r)
//         .attr("fill", "#69a3b2")
//         .attr("opacity", 0.5);
//       svgElement
//         .append("text")
//         .attr("x", positions.x - positions.r * 1.48)
//         .attr("y", positions.y + 30)
//         .text("Data");
//       data.map((project) => {
//         for (let key in project.attributes.mediums.data) {
//           if (
//             project.attributes.mediums.data[key].attributes.Category === "Words"
//           ) {
//             <circle cx={Math.random() * 80 + 10} cy={Math.random() * 35 + 10} r="30" />;
//           }
//           else if (
//             project.attributes.mediums.data[key].attributes.Category === "Arts"
//           ) {
//             <circle cx={Math.random() * 80 + 10} cy={Math.random() * 35 + 10} r="30" />;
//           }
//           else if (
//             project.attributes.mediums.data[key].attributes.Category === "Tech"
//           ) {
//             <circle cx={Math.random() * 80 + 10} cy={Math.random() * 35 + 10} r="30" />;
//           }
//           else if (
//             project.attributes.mediums.data[key].attributes.Category === "Data"
//           ) {
//             <circle cx={Math.random() * 80 + 10} cy={Math.random() * 35 + 10} r="30" />;
//           }
//           else (console.log("Nothing to see here!"))
//         }
//         return null;
//       });
//     }, []);
//     return <svg viewBox="0 0 100 50" ref={ref} />;
//   };

//   return (
//     <div>
//       <Svg />
//       <Venn />
//     </div>
//   );
// }
