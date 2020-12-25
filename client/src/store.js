import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listFilterReducer,
  listNotesReducer,
  noteCreateReducer,
  noteDeleteReducer,
  noteDetailsReducer,
  notesSortReducer,
  noteUpdateReducer,
} from "./Reducers/noteReducers";
const reducer = combineReducers({
  noteList: listNotesReducer,
  noteDetails: noteDetailsReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteFilter: listFilterReducer,
  noteDelete: noteDeleteReducer,
  noteSorted: notesSortReducer,
});
const notesFromStorage = localStorage.getItem("notes")
  ? JSON.parse(localStorage.getItem("notes"))
  : [];

const initialState = {
  notes: notesFromStorage,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
