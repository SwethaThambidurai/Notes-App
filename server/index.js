require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("Error while fetching data");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching data" });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const NoteId = req.params.id;
    const data = await Notes.findById(NoteId);
    if (!data) {
      throw new Error("Error while fetching the data");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching the data" });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("Error while inserting data");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while inserting the data" });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required." });
    }

    const data = await Notes.findByIdAndUpdate(noteId, { title, description });

    if (!data) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the data." });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const NoteId = req.params.id;
    const data = await Notes.findByIdAndDelete(NoteId);
    if (!data) {
      throw new Error("Error while inserting data");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while inserting the data" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("*", (req, res) => {
  res.json("Bubyeee");
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});
