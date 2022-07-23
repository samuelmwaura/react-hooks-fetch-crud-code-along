import React, { useState,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

 useEffect(()=>{
  fetch('http://localhost:4000/items')
  .then(response=>response.json())
  .then(data=>setItems(data))
  .catch(error=>console.log(error))
 },[]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem){
   setItems(()=>{
    return [...items,newItem]
   })
  }

  function handleItemUpdate(updatedItem){
     setItems(()=>{
     return items.map(item=>{
      if(item.id === updatedItem.id) return updatedItem;
      return item;
     })
     })
  }

  function handleDeleteItem(deletedItem){
   setItems(()=>items.filter(item => item.id !== deletedItem.id))
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleItemUpdate={handleItemUpdate} handleDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
