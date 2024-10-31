import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div>
            <h2>Todo List</h2>
            <ul className="list-group d-inline-block">
                <TodoForm />
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}

                {/* <li className="list-group-item d-flex border">
                    <input defaultValue={todo.title}
                        className="form-control me-2"
                        onChange={(e) =>
                            setTodo({
                                ...todo,
                                title: e.target.value
                            })
                        }
                    />
                    <button onClick={() => updateTodo(todo)}
                        type="button"
                        className="btn btn-warning me-2"
                        id="wd-update-todo-click">
                        Update </button>
                    <button onClick={() => addTodo(todo)}
                        type="button"
                        className="btn btn-success"
                        id="wd-add-todo-click">Add</button>
                </li>
                {todos.map((todo) => (
                    <li key={todo.id} className="list-group-item border d-flex justify-content-between">
                        <div className="my-auto">{todo.title}</div>
                        <div>
                            <button onClick={() => setTodo(todo)}
                                type="button"
                                className="btn btn-primary me-2"
                                id="wd-set-todo-click">
                                Edit </button>
                            <button onClick={() => deleteTodo(todo.id)}
                                type="button"
                                className="btn btn-danger"
                                id="wd-delete-todo-click">
                                Delete </button>
                        </div>
                    </li>
                ))} */}
            </ul>
            <hr />
        </div>
    );
}
