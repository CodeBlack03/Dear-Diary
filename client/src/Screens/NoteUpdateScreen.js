import React, { useEffect, useState } from "react";
import { LinkContainer, Col } from "react-router-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { IconButton } from "@material-ui/core";
import NotesContainer from "../Components/NotesContainer";
import UpdateIcon from "@material-ui/icons/Update";
import { Form } from "react-bootstrap";
import {
  createNotes,
  listNoteDetails,
  updateNotes,
} from "../Actions/noteActions";
import { NOTES_UPDATE_RESET } from "../Constants/notes";
const Notes = ({ history, match }) => {
  const noteId = match.params.id;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const noteDetails = useSelector((state) => state.noteDetails);
  const { loading, error, note } = noteDetails;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = noteUpdate;
  console.log("UpdateScreen", note);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: NOTES_UPDATE_RESET });
      history.push(`/notes/${noteId}`);
    } else {
      if (!note.title || note.id !== noteId) {
        dispatch(listNoteDetails(noteId));
        setTitle(note.title);
        setText(note.text);
        setDate(note.date);
      } else {
        setTitle(note.title);
        setText(note.text);
        setDate(note.date);
        console.log("Update", title, text, date);
      }
    }
  }, [dispatch, successUpdate, noteId]);

  const editNoteHandler = (e) => {
    e.preventDefault();
    dispatch(updateNotes({ id: noteId, title, text, date }, noteId - 1));
  };
  return (
    <>
      <NotesContainer>
        <Form>
          <Form.Label>Title</Form.Label>
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              className="createCard"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Group controlId="date">
            <Form.Control
              type="date"
              value={date}
              className="createCard"
              required={true}
              onChange={(e) => setDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Text</Form.Label>
            <Form.Control
              className="my-4"
              as="textarea"
              row="3"
              className="createCard"
              placeholder="Text"
              value={text}
              required
              onChange={(e) => setText(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <IconButton
            type="submit"
            style={{ outline: "none" }}
            onClick={editNoteHandler}
          >
            <UpdateIcon fontSize="large" style={{ color: "#433d3c" }} />
          </IconButton>
        </Form>
      </NotesContainer>
    </>
  );
};

export default Notes;
