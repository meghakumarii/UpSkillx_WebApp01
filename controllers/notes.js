//all functionality for CRUD operation is defined here.
const { notes } = require("../models/notes");//mongoose model

//getting all notes in database
const getnotes = async (req, res) => {
  try {
    const allnotes = await notes.find({});
    res.status(200).json({allnotes});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

//getting a single note whose id is given
const getsinglenote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const single_note = await notes.findOne({ _id: noteID });
    if (!single_note) {
      return res.status(404).json({ msg: `no note with id ${noteID}` });
    }

    res.status(200).json({ single_note });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
//creating a note and posting to database
const createnote = async (req, res) => {
  try {
    console.log(req.body);

    const pnotes = await notes.create(req.body);

    res.status(200).json({pnotes});
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//updating a existing note in database
const updatenote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const { note,completed } = req.body;
    const upNote = await notes.findOneAndUpdate(
      { _id: noteID },
      { note,completed },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!upNote) {
      return res.status(404).json({ msg: `no note with id:${noteID}` });
    }
    res.status(200).json({ upNote });
  } catch (err) {
    res.status(500).json(err);
  }
};

//deleting the note requested by user
const deletenote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await notes.findOneAndDelete({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: "not found" });
    }
    res.status(200).json({ status: "deleted", note });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getnotes,
  getsinglenote,
  createnote,
  updatenote,
  deletenote,
};
