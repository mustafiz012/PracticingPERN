import React, {Fragment, useState} from "react";

const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (event) => {
        event.preventDefault();
        try {
            const body = {description};
            await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message)
        }
    }

    return <Fragment>
        <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target={`#id${todo.todo_id}`}
            onClick={() => setDescription(todo.description)}>
            Edit
        </button>

        <div className="modal" id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Todo</h4>
                        {/*<button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                    </div>

                    <div class="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                            onClick={event => updateDescription(event)}>Save
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                            onClick={() => setDescription(todo.description)}>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </Fragment>
}

export default EditTodo;