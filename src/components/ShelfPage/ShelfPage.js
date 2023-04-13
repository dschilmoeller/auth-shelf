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
            return (
              <div key={item.id}>
                <img src={item.image_url} />
                <p>{item.description}</p>
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}

export default ShelfPage;
