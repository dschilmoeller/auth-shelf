import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

// This adds an item.
function* postNewItem(action) {
  try {
    // This posts to the below route, with a payload consisting of data entered 
    // into the fields by the user.
    yield axios.post("/api/shelf", action.payload);
    // console.log(`action.payload:`, action.payload);

    // this runs FETCH_SHELF and rerenders the screen.
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
