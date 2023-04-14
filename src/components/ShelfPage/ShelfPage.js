import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfItems = useSelector((store) => store.shelfItems);
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editURL, setEditURL] = useState('')
  // console.log('shelf items:', shelfItems);

  const userID = useSelector((store => store.user.id))
  // console.log(`User?`, userID);

  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, []);

  const addNewItem = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        image_url: newImage,
        description: newDescription
      }
    })
  }

  const deleteItem = (event) => {
    // console.log(`event.target.id is:`, event.target.id);
    dispatch({ type: 'DELETE_ITEM', payload: event.target.id })
  }

  const editItem = (a, b, c) => {
    // console.log(`event.target.id:`, event.target.id);
    if (editURL === '') {
      setEditURL(a)
    }
    if (editDescription === '') {
      setEditDescription(b)
    }
    
    dispatch({ 
      type: 'EDIT_ITEM',
      payload: {
        image_url: editURL,
        description: editDescription,
        item_id: event.target.id
      }
    })
  }

  return (
    <>
      <form onSubmit={addNewItem}>
        <input
          type='text'
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
          placeholder='description' />

        <input
          type='text'
          value={newImage}
          onChange={(event) => setNewImage(event.target.value)}
          placeholder='image'
        />
        <button type='submit'>submit</button>
      </form>


      <div className="container">
        <h2>Shelf</h2>
        <div>
          {shelfItems.length &&
            shelfItems.map((item) => {
              // console.log(`item.id =`, item.id);
              return (
                <div key={item.id}>
                  <img src={item.image_url} width="600rem" />
                  <p>{item.description}</p>
                  
                  {userID === item.user_id ? <button id={item.id} onClick={deleteItem}>Delete Item From Shelf</button> : <></>}
                  
                  <form onSubmit={()=> editItem(item.id, item.image_url, item.description)} id={item.id}>
                  <input placeholder="new description" value={editDescription} onChange={(event) => setEditDescription(event.target.value)}/>
                  <input placeholder="new image url" value={editURL} onChange={(event) => setEditURL(event.target.value)}/>
                  <button type="submit" >submit edit</button>
                  </form>

                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ShelfPage;
