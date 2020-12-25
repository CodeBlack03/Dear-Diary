import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "../Components/Notes";
import { Icon, IconButton } from "@material-ui/core";
import { Row, Col, Card } from "react-bootstrap";
import { listNotes } from "../Actions/noteActions";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

const HomeScreen = ({ history, match }) => {
  const sort = match.params.sort ? match.params.sort : "";
  const filter = match.params.filter ? match.params.filter : "";
  console.log("sort", sort);
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { notes } = noteList;
  useEffect(() => {
    dispatch(listNotes(sort, filter));

    // dispatch(listNotes(sort));
  }, [dispatch, sort, history, filter]);
  const createNote = () => {
    history.push("/notes");
  };

  return (
    <>
      {/* {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>} */}
      <Card className="heading">
        <h1 className="swipeButtons my-3 p-3 rounded">My Journal</h1>
      </Card>

      <Row className="grid__notes">
        {notes.map((note, index) => (
          <Row>
            {filter && (
              <Row className="my-3 heading__filter ">
                {filter === "month" &&
                  ((index > 0 &&
                    new Date(notes[index - 1].date).getUTCMonth() !==
                      new Date(note.date).getUTCMonth()) ||
                    index === 0) && (
                    <div className="filter">
                      <h3 className="my-3 p-3" style={{ color: "white" }}>
                        {moment(new Date(note.date)).format("MMMM")}
                      </h3>
                    </div>
                  )}
                {filter === "year" &&
                  ((index > 0 &&
                    new Date(notes[index - 1].date).getFullYear() !==
                      new Date(note.date).getFullYear()) ||
                    index === 0) && (
                    <div className="filter">
                      <h3 className="my-3 p-3" style={{ color: "white" }}>
                        {moment(new Date(note.date)).format("YYYY")}
                      </h3>
                    </div>
                  )}
                {filter === "week" &&
                  ((index > 0 &&
                    !moment(new Date(notes[index - 1].date)).isSame(
                      new Date(note.date),
                      "week"
                    )) ||
                    index === 0 ||
                    index === notes.length - 1) && (
                    <div className="my-1 p-3">
                      <h3 style={{ color: "white" }}>
                        {moment(new Date(note.date)).format("WW")}
                      </h3>
                      <p style={{ color: "white" }}>st</p>
                      <h3 style={{ color: "white" }}>Week</h3>
                    </div>
                  )}
              </Row>
            )}

            <LinkContainer to={`/notes/${note.id}`}>
              <Col key={note.id} sm={12} md={6} lg={4}>
                <Note text={note.text} title={note.title} date={note.date} />
              </Col>
            </LinkContainer>
          </Row>
        ))}
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
      {/* <Paginate
        pages={pages}
        page={page}
        filter={sortedFilter ? sortedFilter : ""}
        sort={
          sort === "-createdAt" ? "desc" : sort === "createdAt" ? "asc" : ""
        }
      ></Paginate> */}
    </>
  );
};

export default HomeScreen;
