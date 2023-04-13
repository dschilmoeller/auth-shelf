import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* postNewItem(action) {
  try {
    yield axios.post("/api/shelf", action.payload);
    yield put({
      type: "FETCH_SHELF",
    });
  } catch (err) {
    console.log("error", err);
  }
}

function* postItem() {
  yield takeEvery("ADD_ITEM", postNewItem);
}

export default postItem;
