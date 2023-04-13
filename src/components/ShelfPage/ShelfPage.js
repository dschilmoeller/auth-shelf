import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelfItems = useSelector((store) => store.shelfItems);
  console.log('shelf items:', shelfItems);

  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, []);

  return (
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
  );
}

export default ShelfPage;
