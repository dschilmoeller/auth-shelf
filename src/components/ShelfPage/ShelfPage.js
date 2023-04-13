import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfItems = useSelector((store) => store.shelfItems);
  console.log('shelf items:', shelfItems);

  const userID = useSelector((store => store.user.id))
  console.log(`User?`, userID);

  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, []);

  const deleteItem = (event) => {
    console.log(`event.target.id is:`, event.target.id);
    dispatch({type: 'DELETE_ITEM', payload: event.target.id})
  }

  return (
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
  );
}

export default ShelfPage;
