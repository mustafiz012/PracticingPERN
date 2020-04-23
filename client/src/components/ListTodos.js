import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //delete
    const deleteTodo = async (todo_id) => {
        try {
            await fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== todo_id))
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos)

    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>

                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo}/>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

                {/*{todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo}/>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteTodo(todo.todo_id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}*/}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;