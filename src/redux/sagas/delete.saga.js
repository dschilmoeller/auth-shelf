import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

// This saga controls deleting rows from the table "item"
function* deleteItem(action) {
    // console.log(`You are in deleteItemFromShelf with action:`, action);
    try {
        // this selects the item to delete, matched to the id column in table "item"
        yield axios.delete(`/api/shelf/${action.payload}`);
        
        // then re-render the list
        yield put({ type: 'FETCH_SHELF' })
    } catch (error) {
        console.log(`Error deleting item`, error);
    }
}

function* deleteItemFromShelf() {
    yield takeEvery("DELETE_ITEM", deleteItem)
}

export default deleteItemFromShelf