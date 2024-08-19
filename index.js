import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/get-lyrics", async (req, res) => {
  const searchArtist = req.body.artist;
  const searchTitle = req.body.title;
  
  try {
    const result = await axios.get(API_URL + `/${searchArtist}/${searchTitle}`);
    const lyrics =  result.data.lyrics;

    // console.log(lyrics);
    res.render("index.ejs", { 
        artist: searchArtist.replace(/\b\w/g, char => char.toUpperCase()),
        title: searchTitle.replace(/\b\w/g, char => char.toUpperCase()),
        lyrics: lyrics,
    });
  } catch (error) {
    res.render("index.ejs", { lyrics: "No lyrics found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
