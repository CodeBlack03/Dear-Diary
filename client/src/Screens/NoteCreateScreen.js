import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { ButtonBase, IconButton } from "@material-ui/core";
import NotesContainer from "../Components/NotesContainer";
import {
  Row,
  Container,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { createNotes, listNoteDetails } from "../Actions/noteActions";
import { NOTES_CREATE_RESET } from "../Constants/notes";
const Notes = ({ history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, success, note } = noteCreate;

  const noteDetails = useSelector((state) => state.noteDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    note: noteDetail,
  } = noteDetails;

  useEffect(() => {
    if (success) {
      dispatch({ type: NOTES_CREATE_RESET });
      history.push(`/notes/${note._id}`);
    }
  }, [dispatch, success, history, error, errorDetails]);

  const createNoteHandler = (e) => {
    e.preventDefault();
    dispatch(createNotes(title, text));
  };
  console.log(error);

  return (
    <>
      {loadingDetails && <Loader />}
      {errorDetails && <Message variant="danger">{errorDetails}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <NotesContainer>
            <Form>
              <Form.Label>Title</Form.Label>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={title}
                  className="createCard"
                  required={true}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="text">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  className="my-4"
                  as="textarea"
                  row="3"
                  required={true}
                  placeholder="Text"
                  value={text}
                  className="createCard"
                  onChange={(e) => setText(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <IconButton
                type="submit"
                style={{ outline: "none", color: "#433d3c" }}
                onClick={createNoteHandler}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Form>
          </NotesContainer>
        </>
      )}
    </>
  );
};

export default Notes;
