import React, {FC} from 'react';
import {I_ToDo} from "../types/types";

interface I_ToDoItemProps {
    todo: I_ToDo,
    completeHandler: (e : React.ChangeEvent<HTMLInputElement>, id: number | null) => void
    removeHandler: (id: number | null) => void
}

const TodoItem: FC<I_ToDoItemProps> = ({todo, completeHandler, removeHandler}) => {
    return (
        <div>
            <input type="checkbox" checked={todo.completed} onChange={e => completeHandler(e, todo.id)} />
            {todo.id}. {todo.title}
            <button onClick={() => removeHandler(todo.id)}>Remove</button>
        </div>
    );
};

export default TodoItem;