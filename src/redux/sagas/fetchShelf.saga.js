import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchShelfAgain() {
  try {
    const shelfItems = yield axios.get("/api/shelf");
    console.log('incoming shelf', shelfItems.data);
    yield put({
      type: "SET_SHELF",
      payload: shelfItems.data,
    });
  } catch (err) {
    console.log("error getting items", err);
  }
}

function* fetchShelf() {
    // fetch all shelf items
  yield takeEvery("FETCH_SHELF", fetchShelfAgain);
}

export default fetchShelf;
