import axios from 'axios'

function* deleteItemFromShelf(action) {
    console.log(`You are in deleteItemFromShelf with action:`, action);
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        // THIS WILL RUN WHATEVER THE GET IS
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.log(`Error deleting item`, error);
    }
}

export default deleteItemFromShelf