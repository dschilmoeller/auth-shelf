import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

function* deleteItem(action) {
    console.log(`You are in deleteItemFromShelf with action:`, action);
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.log(`Error deleting item`, error);
    }
}

function* deleteItemFromShelf() {
    yield takeEvery("DELETE_ITEM", deleteItem)
}

export default deleteItemFromShelf