import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {I_ToDo} from "../types/types";
import TodoItem from "./TodoItem";

const Todos: FC = () => {

    const [items, setItems] = useState<I_ToDo[]>([]);
    const [newItem, setNewItem] = useState<I_ToDo>({id: 0, title: "", completed: false});

    //set to state
    useEffect(() => {
        fetchTodos();

        return () => {
            console.log("cleaned");
        }
    }, [])

    //fetch data
    const fetchTodos = async () => {
        try {
            let response = await axios.get<I_ToDo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3');
            setItems(response.data);
        } catch (e) {
            console.log(e);
        }
   }

   //update status
   const completeHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number| null) => {
       setItems(
           [...items.map(item => item.id === id ? {...item, completed: e.target.checked} : item)]
       )
   }

    //save value for new item from input
    const NewItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        setNewItem({
            ...newItem,
            id: items[items.length - 1].id + 1,
            title: e.target.value
        })
    }

    //add new item
    const addItemHandler = () => {
        setItems([...items, newItem])
        setNewItem({
            ...newItem,
            title: ""
        })
    }

    //remove item
    const removeHandler = (id: number | null) => {
        setItems(
            [...items.filter(item => item.id !== id)]
        )
    }

    return (
        <div>
            <div>
                <input type="text" placeholder={"Add new..."} onChange={NewItemHandler} value={newItem.title} />
                <button onClick={addItemHandler}>Click</button>
            </div>
            <div className="todos-list">
                {
                    items.map(item => (
                       <TodoItem key={item.id} todo={item} completeHandler={completeHandler} removeHandler={removeHandler} />
                    ))
                }
            </div>
        </div>
    );
};

export default Todos;