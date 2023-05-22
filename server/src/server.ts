require("dotenv").config();
import http from "http";
import { Client } from "@notionhq/client";

// @ts-nocheck

// This is Typescript  interface for the shape of the object we will
// create based on our database to send to the React app
// When the data is queried it will come back in a much more complicated shape, so our goal is to
// simplify it to make it easy to work with on the front end
interface Project {
  // name: string;
  slogan: string;
  description: string;
  bgcolour: string;
  selectedwork: boolean;
  media: string;
}


interface sloganCell {
  properties: object;
}


// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in .env");
}

// Initializing the Notion client with your secret
const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;
// Require an async function here to support await with the DB query
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.url) {
    case "/":
      // Query the database and wait for the result
      const query = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      // We map over the complex shape of the results and return a nice clean array of
      // objects in the shape of our `ThingToLearn` interface
      const list: Project[] = query.results.map((row) => {
        // row represents a row in our database and the name of the column is the
        // way to reference the data in that column
        // const nameCell = row.properties.name;

        console.log("Logging out some info")
        console.log(row)
        const sloganCell = row.properties.slogan;
        const descriptionCell = row.properties.description;
        const bgcolourCell = row.properties.bgcolour;
        const selectedworkCell = row.properties.selectedwork;
        const mediaCell = row.properties.media;

        console.log("I'm about to log out the slogan and description!!")
        console.log(sloganCell);
        console.log(descriptionCell);

        // Depending on the column "type" we selected in Notion there will be different
        // data available to us (URL vs Date vs text for example) so in order for Typescript
        // to safely infer we have to check the `type` value.  We had one text and one url column.
        // const isName = nameCell.type === "title";
        const isSlogan = sloganCell.parent.type === "rich_text";
        const isDescription = descriptionCell.parent.type === "rich_text";
        const isBgcolour = bgcolourCell.parent.type === "rich_text";
        const isSelectedwork = selectedworkCell.parent.type === "checkbox";
        const isMedia = mediaCell.parent.type === "url";

        // Verify the types are correct
        if (
          // isName &&
          isSlogan &&
          isDescription &&
          isBgcolour &&
          isSelectedwork &&
          isMedia
        ) {
          // Pull the string values of the cells off the column data
          // const name = nameCell.title?.[0].plain_text ?? "";
          const slogan = sloganCell.rich_text?.[0].plain_text ?? "";
          const description = descriptionCell.rich_text?.[0].plain_text ?? "";
          const bgcolour = bgcolourCell.rich_text?.[0].plain_text ?? "";
          const selectedwork = selectedworkCell.checkbox;
          const media = mediaCell.url ?? "";

          // Return it in our `ThingToLearn` shape
          return { slogan, description, bgcolour, selectedwork, media };
        }

        // If a row is found that does not match the rules we checked it will still return in the
        // the expected shape but with a NOT_FOUND label
        return {
          // name: "NOT_FOUND",
          slogan: "NOT_FOUND",
          description: "NOT_FOUND",
          bgcolour: "",
          selectedwork: false,
          media: "",
        };
      });

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(list));
      break;

    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
