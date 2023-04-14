import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects';

// To see more information about where this data is coming from, re-enable the console logs. 
// The editItem function in the ShelfPage component is passing the info to this saga.

function* editItem(action) {
    // console.log(`You are in editItemOnShelf with action:`, action);
    // The below may be unnecessary but ensures the link aimed at is a number.
    let idForUrl = Number(action.payload.item_id)
    // console.log(`idForURL:`, idForUrl);

    try {
        // First PUT to the ID, which should match Table item, Column id
        yield axios.put(`/api/shelf/${idForUrl}`, action.payload);
        // then run the FETCH_SHELF saga and rerender the list
        yield put({ type: 'FETCH_SHELF' })
    } catch (error) {
        console.log(`Error editing item`, error);
    }
}

function* editItemOnShelf() {
    yield takeEvery("EDIT_ITEM", editItem)
}

export default editItemOnShelf