const express = require("express");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Note = require("../models/Note");
const moment = require("moment");
const _ = require("lodash");
const { Model } = require("mongoose");
exports.getAllNotes = catchAsync(async (req, res, next) => {
  const notes = await Note.find({});
  res.status(200).json(res.advancedResults);
});

exports.getNoteById = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return next(new AppError("No Note Found!", 404));
  }
  res.status(200).send(note);
});

exports.createNote = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const note = new Note(req.body);

  console.log(note);
  await note.save();
  res.status(201).json(note);
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.body.id);
  if (!note) {
    return next(new AppError("No Note Found", 404));
  }
  note.title = req.body.title;
  note.text = req.body.text;
  await note.save();
  res.json(note);
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    return next(new AppError("No Note Found!", 404));
  }
  res.json("SuccessFully deleted");
});
