const mongoose = require("mongoose"); // Erase if already required
const moment = require("moment");
// Declare the Schema of the Mongo model
var noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    week: {
      type: String,
    },
    year: {
      type: String,
    },
    month: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.pre("save", async function (next) {
  const note = this;
  (note.week = moment(note.createdAt).format("WW").toString()),
    (note.year = moment(note.createdAt).format("YYYY").toString()),
    (note.month = moment(note.createdAt).format("MMMM").toString()),
    next();
});
//Export the model
module.exports = mongoose.model("Note", noteSchema);
