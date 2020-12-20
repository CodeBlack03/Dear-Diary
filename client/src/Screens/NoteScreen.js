import React, { useState, useEffect } from "react";
import { Row, Col, Form, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNoteDetails } from "../Actions/noteActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteNote } from "../Actions/noteActions";
import { NOTES_DELETE_RESET } from "../Constants/notes";

const NoteScreen = ({ match, history }) => {
  const noteId = match.params.id;
  const dispatch = useDispatch();
  //   const [title, setTitle] = useState("");
  //   const [text, setText] = useState("");
  //   const [date, setDate] = useState("");
  const noteDetails = useSelector((state) => state.noteDetails);
  const { loading, error, note } = noteDetails;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    if (successDelete) {
      console.log("ho gaya delete");
      dispatch({ type: NOTES_DELETE_RESET });
      history.push("/");
    } else {
      dispatch(listNoteDetails(match.params.id));
    }
  }, [dispatch, match, successDelete, history]);
  const deleteHandler = () => {
    dispatch(deleteNote(noteId));
  };
  const goBack = () => {
    document.location.href = "/";
  };
  return (
    <>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={12}>
              <LinkContainer to="/">
                <div className="goBack p-3 ml-auto">
                  <IconButton
                    className="swipeButtons__back"
                    style={{ fontSize: 30, outline: "none" }}
                  >
                    <ArrowBackIosIcon fontSize="large" />
                  </IconButton>
                </div>
              </LinkContainer>
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{note.title}</h2>
                </ListGroup.Item>
                <ListGroup.Item style={{ float: "right" }}>
                  <p>{note.createdAt && note.createdAt.substring(0, 10)}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <p className="content">{note.text}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <div className="swipeButtons">
              <LinkContainer to={`/notes/${noteId}/edit`}>
                <IconButton
                  type="submit"
                  style={{ outline: "none" }}
                  className="swipeButtons__edit"
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              </LinkContainer>
              <IconButton
                type="submit"
                style={{ outline: "none" }}
                onClick={deleteHandler}
                className="swipeButtons__delete"
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          </Row>
        </>
      )}
    </>
  );
};

export default NoteScreen;
