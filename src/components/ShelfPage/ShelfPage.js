import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ShelfPage() {
  // set up dispatch
  const dispatch = useDispatch();

  // use selector to pull list of items for the shelf [non-local piece of state]
  const shelfItems = useSelector((store) => store.shelfItems);
  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  const userID = useSelector((store => store.user.id))

  // set up several local pieces of state for the two forms, create and edit
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editURL, setEditURL] = useState('')

  // on page load, run 'FETCH_SHELF' -> results in rendering of items.
  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, []);


  // function to add a new item. Takes in two pieces of local state and 
  // dispatches them to post.saga.js in src/redux/sagas.
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

  // function to delete an item. Takes target id (generated during map of returned HTML, below)
  const deleteItem = (event) => {
    // console.log(`event.target.id is:`, event.target.id);
    dispatch({ type: 'DELETE_ITEM', payload: event.target.id })
  }

  // function to edit an existing item. Takes in 3 pieces of data
  // the 'incoming' variables are the existing, default data rendered by the
  // .map in the return below. They are used only when a field is left blank
  const editItem = (incomingID, incomingURL, incomingDesc) => {
    // first check the URL input; if blank, change the URL to the existing one
    if (editURL === '') {
      setEditURL(incomingURL)
    }

    // second check the description input; if blank, change the URL to the existing one
    if (editDescription === '') {
      setEditDescription(incomingDesc)
    }

    // dispatch EDIT with a payload of the required data to pass back along to the server. 
    dispatch({
      type: 'EDIT_ITEM',
      payload: {
        image_url: editURL,
        description: editDescription,
        item_id: incomingID
      }
    })
  }

  return (
    <>
      {/* Form for submitting a new item. Always renders. */}
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
          {/* Runs through contents of the 'shelf', consists of rows from the item table in the DB */}
          {shelfItems.length &&
            shelfItems.map((item) => {
              // console.log(`item.id =`, item.id);
              return (
                // This shows the image and restricts the size, then renders a paragraph with the description from the database.
                <div key={item.id}>
                  <img src={item.image_url} width="600rem" />
                  <p>{item.description}</p>

                  {/* if the user id matches the item's user_id (from table) a delete button is rendered. 
                  This is not secure but is meant to keep folks in their lanes. */}
                  {userID === item.user_id ? <button id={item.id} onClick={deleteItem}>Delete Item From Shelf</button> : <></>}

                  {/* Below is a form for editing items. Currently it renders and displays the same data for all items as it's entered.
                  Not super fancy but a good start. */}

                  {/* This line handles submission. Because we want the default data, we need to pass parameters into the editItem function.
                  However, if editItem is written without the () => in front of it, it will be called in an infinite loop due to the syntax used.
                  the () => represents an anonymous function which is NOT called on render, and thus causes editItem to behave as we would expect,
                  that is, running only when the submit button is pushed. */}
                  <form onSubmit={() => editItem(item.id, item.image_url, item.description)} id={item.id}>
                    {/* This is the input handling the description. It's value a const managed by setEditDescription; this allows us to type into
                    the input field normally. */}
                    <input placeholder="new description" value={editDescription} onChange={(event) => setEditDescription(event.target.value)} />
                    {/* This is the input handling the URL. See above. */}
                    <input placeholder="new image url" value={editURL} onChange={(event) => setEditURL(event.target.value)} />
                    {/* This is a button that activates the submit function of the form, above. */}
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
