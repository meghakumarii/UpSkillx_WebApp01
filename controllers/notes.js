
const { notes } = require("../models/notes");

const getnotes = async (req, res) => {
  try {
    const allnotes = await notes.find({});
    res.status(200).json({allnotes});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getsinglenote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const note = await notes.findOne({ _id: noteID });
    if (!note) {
      return res.status(404).json({ msg: `no note with id ${noteID}` });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
//creating a note and posting to database
const createnote = async (req, res) => {
  try {
    console.log(req.body);

    const note = await notes.create(req.body);

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updatenote = async (req, res) => {
  try {
    const { id: noteID } = req.params;
    const { note, completed } = req.body;
    const up_note = await notes.findOneAndUpdate(
      { _id: noteID },
      { note, completed },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!up_note) {
      return res.status(404).json({ msg: `no note with id:${noteID}` });
    }
    res.status(200).json({ up_note });
  } catch (err) {
    res.status(500).json(err);
  }
};

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
