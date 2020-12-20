import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listFilterReducer,
  listNotesReducer,
  noteCreateReducer,
  noteDeleteReducer,
  noteDetailsReducer,
  noteUpdateReducer,
} from "./Reducers/noteReducers";
const middleware = [thunk];
const reducer = combineReducers({
  noteList: listNotesReducer,
  noteDetails: noteDetailsReducer,
  noteCreate: noteCreateReducer,
  noteUpdate: noteUpdateReducer,
  noteFilter: listFilterReducer,
  noteDelete: noteDeleteReducer,
});

const store = createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
