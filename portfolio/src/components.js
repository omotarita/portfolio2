import React, { useState, useEffect } from "react";
import { SimpleGrid } from "@chakra-ui/react";

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
    <SimpleGrid className="project-grid" minChildWidth="300px" spacing="40px">
      {data.map((project) => {
        if (project.attributes.SelectedWork === true) {
          return (
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
              <h1 className="project-title">{project.attributes.Title}</h1>
            </div>
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
    <SimpleGrid className="project-grid" minChildWidth="300px" spacing="40px">
      {data.map((project) => {
        return (
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
            <h1 className="project-title">{project.attributes.Title}</h1>
          </div>
        );
      })}
    </SimpleGrid>
  );
}
