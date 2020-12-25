import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { MDBView } from "mdbreact";

import { ButtonBase, IconButton, Card } from "@material-ui/core";
import NotesContainer from "./NotesContainer";
import { Form } from "react-bootstrap";
import { createNotes, updateNotes } from "../Actions/noteActions";
import { NOTES_UPDATE_RESET } from "../Constants/notes";
const Notes = ({ text, title, date }) => {
  return (
    <>
      <Card className="my-3  p-3 rounded note">
        <div>
          <h2>{title}</h2>
          <p className="date">{date}</p>
        </div>

        <p className="content">
          {text.length > 20 ? text.substring(0, 20) + "...." : text}
        </p>
      </Card>
    </>
  );
};

export default Notes;
