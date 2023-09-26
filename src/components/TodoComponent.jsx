import React, { useRef,useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItemComponent from "./TodoItemComponent";
const TodoComponent = () => {
    const inputRef = useRef();
    const [item, setItem] = useState("");
    const [todoItems, setTodoItems] = useState([]);
    const [errors, setErrors] = useState("");

    const handleAddItem = () => {
        if (item) {  
        setTodoItems([...todoItems, {id: uuid(), name: item}]);
        setItem("");
        setErrors("");
      }  else {
        setErrors("TODO item cannot be empty.");
        inputRef.current.focus();
      }
    };

    const handleEditItem = (id, newItem) => {
        const updatedTodoItems = todoItems.map((item) => {
          if (item.id === id) {
            return { ...item, name: newItem };
          }
    
          return item;
        });
        setTodoItems(updatedTodoItems);
      };
    
      const handleDeleteItem = (removeId) => {
        const filteredItems = todoItems.filter((item) => item.id !== removeId);
        setTodoItems(filteredItems);
      };
    
      const handleClearItems = () => {
        setTodoItems([]);
      };

    return (
      <div className="todo-list">
        <h1>Todo List</h1>
        <div className="input-section">
            <div className="input-container">
                <input 
                ref={inputRef}
                type = "text" 
                placeholder="Enter an item..." 
                value={item} 
                onChange={(event) => setItem(event.target.value)}
                />
                <button onClick={handleAddItem} className="btn-add">
                    Add Item
                    </button>
            </div>
            <div>{errors ? <p className="errors">{errors}</p> : null}</div>
        </div>
        <ul className="todo-list">
            {todoItems.map((item) =>(
                 <TodoItemComponent 
                 key={item.id} 
                 item={item}
                 handleEditItem={handleEditItem}
                handleDeleteItem={handleDeleteItem}
                 />
                 ))}
        </ul>
        {todoItems.length > 0 ? (
        <button onClick={handleClearItems} className="btn-clear">
          Clear TODO Items{" "}
        </button>
      ) : null}
    </div>
    );
};

export default TodoComponent;