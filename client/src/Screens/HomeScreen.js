import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "../Components/Notes";
import { Icon, IconButton } from "@material-ui/core";
import { Row, Col, Card } from "react-bootstrap";
import { listNotes } from "../Actions/noteActions";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../Components/Paginate";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
const HomeScreen = ({ history, match }) => {
  const keyword = match.params.keyword;
  const sort =
    match.params.sort === "asc"
      ? "createdAt"
      : match.params.sort === "desc"
      ? "-createdAt"
      : "";
  const dispatch = useDispatch();
  const pageNumber = match.params.page || 1;

  const filter = match.params.filter ? match.params.filter : "";
  const sortedFilter = sort === "asc" ? "-" + filter : filter;

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes, page, pages } = noteList;

  useEffect(() => {
    dispatch(listNotes(sort, sortedFilter, pageNumber, keyword));
  }, [dispatch, filter, pageNumber, sortedFilter, sort, keyword, error]);
  console.log(notes);
  const createNote = () => {
    history.push("/notes");
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Card className="heading">
        <h1 className="swipeButtons my-3 p-3 rounded">My Journal</h1>
      </Card>
      <Row>
        {notes.map((note, index) => (
          <>
            {sortedFilter && (
              <Row className="my-3 ">
                {(sortedFilter === "month" || sortedFilter === "-month") &&
                  index < notes.length - 1 &&
                  (notes[index + 1].month !== note.month || index === 0) && (
                    <h3 className="my-3 p-3" style={{ color: "white" }}>
                      {note.month}
                    </h3>
                  )}
                {(sortedFilter === "year" || sortedFilter === "-year") &&
                  index < notes.length - 1 &&
                  (notes[index + 1].year !== note.year || index === 0) && (
                    <h3 className="my-3 p-3" style={{ color: "white" }}>
                      {note.year}
                    </h3>
                  )}
                {(sortedFilter === "week" || sortedFilter === "-week") &&
                  index < notes.length - 1 &&
                  (notes[index + 1].week !== note.week || index === 0) && (
                    <div className="my-1 p-3">
                      <h3 style={{ color: "white" }}>{note.week}</h3>
                      <p style={{ color: "white" }}>st</p>
                      <h3 style={{ color: "white" }}>Week</h3>
                    </div>
                  )}
              </Row>
            )}

            <LinkContainer to={`/notes/${note._id}`}>
              <Col key={note._id} sm={12} md={6} lg={4}>
                <Note
                  text={note.text}
                  title={note.title}
                  date={note.createdAt.substring(0, 10)}
                />
              </Col>
            </LinkContainer>
          </>
        ))}

        <Col></Col>
      </Row>
      <Row>
        <Col>
          <div className="swipeButtons">
            <IconButton
              className="my-3 p-3 justify-content-center align-items-center swipeButtons__add"
              onClick={createNote}
              style={{ fontSize: 30, outline: "none" }}
            >
              <Icon
                className="fa fa-plus-circle"
                style={{ fontSize: 30, outline: "none" }}
              />
            </IconButton>
          </div>
        </Col>
      </Row>
      <Paginate
        pages={pages}
        page={page}
        filter={sortedFilter ? sortedFilter : ""}
        sort={
          sort === "-createdAt" ? "desc" : sort === "createdAt" ? "asc" : ""
        }
      ></Paginate>
    </>
  );
};

export default HomeScreen;
