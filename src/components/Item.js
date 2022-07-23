import React from "react";

function Item({ item, handleItemUpdate,handleDeleteItem}) {

function addToCart(currentItem){
const updatedItem = {isInCart: !currentItem.isInCart}
console.log(updatedItem);
fetch(`http://localhost:4000/items/${currentItem.id}`,{
  method:'PATCH',
  headers:{
    'Content-Type':'Application/json',
    'Access':'Application/json'
  },
  body:JSON.stringify(updatedItem)
})
.then(response=>response.json())
.then(data=>handleItemUpdate(data))//returns te updated item
.catch(error=> console.log(error))
}

function deleteItem(){
fetch(`http://localhost:4000/items/${item.id}`,{
  method:'DELETE'
})
.then(response=>response.json())
.then(data=>handleDeleteItem(item)) // Delete does not return anything after the fecth.
.catch(error=>console.log(error))
};

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={()=>addToCart(item)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={deleteItem}>Delete</button>
    </li>
  );
}

export default Item;
