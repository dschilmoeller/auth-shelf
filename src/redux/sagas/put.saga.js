import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

function* editItem(action) {
    // console.log(`You are in editItemOnShelf with action:`, action);
    let idForUrl = Number (action.payload.item_id)
    // console.log(`idForURL:`, idForUrl);
    try {
        yield axios.put(`/api/shelf/${idForUrl}`, action.payload);
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.log(`Error editing item`, error);
    }
}

function* editItemOnShelf() {
    yield takeEvery("EDIT_ITEM", editItem)
}

export default editItemOnShelf