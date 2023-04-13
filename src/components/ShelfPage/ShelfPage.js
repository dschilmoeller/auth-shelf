import React,{useState} from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfItems = useSelector((store) => store.shelfItems);
  const [newItem, setNewItem] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  console.log('shelf items:', shelfItems);

  const userID = useSelector((store => store.user.id))
  console.log(`User?`, userID);

  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, []);

const addNewItem = (event)=>{
event.preventDefault();
dispatch({
  type: 'ADD_ITEM',
  payload: newItem
})

const changeDescription = (event)=>{
    setNewDescription(event.target.value)

}

const changeImage = (event)=>{
    setNewImage(event.target.value)
}

}

  const deleteItem = (event) => {
    console.log(`event.target.id is:`, event.target.id);
    dispatch({type: 'DELETE_ITEM', payload: event.target.id})
  }

  return (
<>
    <form onSubmit={addNewItem}>
      <input
      type='text'
      value={newDescription}
      onChange={(event)=> changeDescription(event)}
      placeholder='description'>
      </input>
      <input
      type='text'
      value={newImage}
      onChange={(event)=> changeImage(event)}
      placeholder='image'
      ></input>
    </form>


    <div className="container">
      <h2>Shelf</h2>
      <div>
        {shelfItems.length &&
          shelfItems.map((item) => {
            console.log(`item.id =`, item.id);
            return (
              <div key={item.id}>
                <img src={item.image_url} width="600rem" />
                <p>{item.description}</p>
                {userID === item.user_id ? <button id={item.id} onClick={deleteItem}>Delete Item From Shelf</button> : <></> }
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}

export default ShelfPage;
