import moment from "moment";

import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_DETAILS_FAIL,
  NOTES_DETAILS_REQUEST,
  NOTES_DETAILS_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_SORT_FAIL,
  NOTES_SORT_REQUEST,
  NOTES_SORT_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../Constants/notes";
export const listNotes = (order = "", filter = "") => async (
  dispatch,
  getState
) => {
  try {
    console.log("Action sort", order);
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const notes = localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [];

    notes.sort(function (a, b) {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    console.log("Filter", filter);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    if (filter === "month") {
      notes.sort((a, b) => {
        if (new Date(a.date) !== new Date(b.date)) {
          return (
            new Date(a.date).getFullYear() - new Date(b.date).getFullYear()
          );
        } else {
          return (
            months.indexOf(new Date(a.date).getMonth()) -
            months.indexOf(new Date(b.date).getMonth())
          );
        }
      });
    }

    if (filter === "year") {
      notes.sort(function (a, b) {
        return moment(new Date(a.date)).isBefore(new Date(b.date), "year")
          ? -1
          : moment(new Date(a.date)).isSame(new Date(b.date), "year")
          ? 0
          : 1;
      });
    }

    if (filter === "week") {
      notes.sort(function (a, b) {
        return moment(new Date(a.date)).isBefore(new Date(b.date), "week")
          ? -1
          : moment(new Date(a.date)).isSame(new Date(b.date), "week")
          ? 0
          : 1;
      });
    }

    console.log(notes);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: notes,
    });
  } catch (error) {
    dispatch({
      type: NOTES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listNoteDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DETAILS_REQUEST,
    });
    const notes = JSON.parse(localStorage.getItem("notes"));
    const data = notes[id - 1];
    console.log("List", notes, data);
    dispatch({
      type: NOTES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNotes = (title, text, date) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: NOTES_CREATE_REQUEST,
    });
    const notes = localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : [];
    const data = { title, text, id: notes.length + 1, date };
    dispatch({
      type: NOTES_CREATE_SUCCESS,
      payload: data,
    });
    console.log(data);

    notes.push(data);
    console.log(notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    dispatch({
      type: NOTES_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNotes = (note, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_UPDATE_REQUEST,
    });

    let notes = JSON.parse(localStorage.getItem("notes"));
    console.log("Id", id);

    notes[id] = note;

    console.log("update", notes);

    localStorage.setItem("notes", JSON.stringify(notes));

    dispatch({
      type: NOTES_UPDATE_SUCCESS,
      payload: note,
    });
  } catch (error) {
    dispatch({
      type: NOTES_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DELETE_REQUEST,
    });

    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(id, 1);
    for (var i = id; i < notes.length; i++) {
      notes[i].id -= 1;
    }
    console.log("Delete", notes);

    localStorage.setItem("notes", JSON.stringify(notes));
    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: notes,
    });
  } catch (error) {
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sortNotes = (notes, order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_SORT_REQUEST,
    });

    notes.sort(function (a, b) {
      return order === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    });

    dispatch({
      type: NOTES_SORT_SUCCESS,
      payload: notes,
    });
  } catch (error) {
    dispatch({
      type: NOTES_SORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
