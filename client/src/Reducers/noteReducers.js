import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_RESET,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_RESET,
  NOTES_DELETE_SUCCESS,
  NOTES_DETAILS_FAIL,
  NOTES_DETAILS_REQUEST,
  NOTES_DETAILS_RESET,
  NOTES_DETAILS_SUCCESS,
  NOTES_FILTER_FAIL,
  NOTES_FILTER_REQUEST,
  NOTES_FILTER_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_SORT_FAIL,
  NOTES_SORT_REQUEST,
  NOTES_SORT_RESET,
  NOTES_SORT_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_RESET,
  NOTES_UPDATE_SUCCESS,
} from "../Constants/notes";

export const listNotesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { loading: true, notes: [] };
    case NOTES_LIST_SUCCESS:
      return {
        loading: false,
        notes: action.payload,
      };
    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const listFilterReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_FILTER_REQUEST:
      return { loading: true, notes: [] };
    case NOTES_FILTER_SUCCESS:
      return { loading: false, notes: action.payload.data };
    case NOTES_FILTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true };
    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case NOTES_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const noteDetailsReducer = (state = { note: {} }, action) => {
  switch (action.type) {
    case NOTES_DETAILS_REQUEST:
      return { loading: true, ...state };
    case NOTES_DETAILS_SUCCESS:
      return { loading: false, note: action.payload };
    case NOTES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case NOTES_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true, ...state };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true, note: action.payload };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTES_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { loading: true };
    case NOTES_UPDATE_SUCCESS:
      return { loading: false, success: true, note: action.payload };
    case NOTES_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case NOTES_UPDATE_RESET:
      return { note: {} };
    default:
      return state;
  }
};

export const notesSortReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTES_SORT_REQUEST:
      return { loading: true, ...state };
    case NOTES_SORT_SUCCESS:
      return { loading: false, success: true, notes: action.payload };
    case NOTES_SORT_FAIL:
      return { loading: false, error: action.payload };
    case NOTES_SORT_RESET:
      return { notes: [] };
    default:
      return state;
  }
};
