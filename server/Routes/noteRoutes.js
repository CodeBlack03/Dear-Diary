const express = require("express");
const router = express.Router();
const advancedResults = require("../Middleware/getAdvancedResults");
const noteController = require("../Controllers/notesController");
const Note = require("../models/Note");
router
  .route("/")
  .get(advancedResults(Note), noteController.getAllNotes)
  .post(noteController.createNote);

router
  .route("/:id")
  .get(noteController.getNoteById)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = router;
