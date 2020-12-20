import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";

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

  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { loading, error, note } = noteCreate;

  const noteDetails = useSelector((state) => state.noteDetails);
  const { loading, error, note } = noteDetails;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = noteUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: NOTES_UPDATE_RESET });
      history.push(`/notes/${noteId}`);
    } else {
      if (!note.title || note._id !== noteId) {
        dispatch(listNoteDetails(noteId));
      } else {
        setTitle(note.title);
        setText(note.text);
      }
    }
  }, [dispatch, history, note, noteId, successUpdate]);

  const editNoteHandler = (e) => {
    e.preventDefault();
    dispatch(updateNotes({ id: noteId, title, text }));
  };
  return (
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
  );
};

export default Notes;
