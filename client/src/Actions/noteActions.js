import axios from "axios";
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
  NOTES_FILTER_FAIL,
  NOTES_FILTER_REQUEST,
  NOTES_FILTER_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../Constants/notes";
export const listNotes = (
  sort = "",
  sortedFilter = "",
  page = "",
  keyword = ""
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/notes?sort=${sort}&sortedFilter=${sortedFilter}&page=${page}&keyword=${keyword}`
    );
    // /filtered?filter=${filter}

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
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

export const listFilteredNotes = (filter = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: NOTES_FILTER_REQUEST,
    });

    const { data } = await axios.get(`/api/notes/filtered?filter=${filter}`);
    // /filtered?filter=${filter}

    dispatch({
      type: NOTES_FILTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTES_FILTER_FAIL,
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

    const { data } = await axios.get(`/api/notes/${id}`);

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

export const createNotes = (title, text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_CREATE_REQUEST,
    });
    const {
      //   userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(title, text);
    const { data } = await axios.post(`/api/notes`, { title, text }, config);

    dispatch({
      type: NOTES_CREATE_SUCCESS,
      payload: data,
    });
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

export const updateNotes = (note) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_UPDATE_REQUEST,
    });
    const {
      //   userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(`/api/notes/${note._id}`, note, config);

    dispatch({
      type: NOTES_UPDATE_SUCCESS,
      payload: data,
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
    const {
      //   userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/notes/${id}`, {}, config);

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data,
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
