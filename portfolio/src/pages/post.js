import React, { useState, useEffect } from "react";
import { GatherFromCMS, useFetch } from "../components";

const Post = () => {
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/projects?populate=*"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no! Something's gone wrong 💔 {error.message}</p>;

  let post_slug = window.location.pathname.split("/post")[1];
  // console.log(post_slug)
  let id = (post_slug.split("/")[1]) -1;
  console.log(data);

  return (
    <div className="main-body center">
      <h1 className="big-intro-text text-left">{data[id].attributes.Title}</h1>
      <h1 className="big-intro-text text-right">
        {data[id].attributes.Slogan}
      </h1>
      <div>
        <div>👩🏾‍💻</div>
        <div>{Object.keys(data[id].attributes.stacks).length} technology</div>
        <img
          src={
            "http://localhost:1337" +
            data[id].attributes.Thumbnail.data.attributes.formats.large.url
          }
          className="project-photo"
        />
        <div>⏰</div>
        <div>{Math.round((Date.parse(data[id].attributes.EndDate) - Date.parse(data[id].attributes.StartDate))/86400000)} days</div>
      </div>

      <p>{data[id].attributes.Description}</p>
    </div>
  );
};

export default Post;
