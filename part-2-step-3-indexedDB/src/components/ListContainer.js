import React from "react";

const ListContainer = ({
    index,
    todoId,
    title,
    description,
    status,
    removeFunction,
    onOpenModal,
    that,
    updateStatusFunction
}) => (
        <div className="card mb-4" key={index}>
            <div className="card-body">
                <table className="table" >
                    <tbody>
                        <tr>
                            <th>Todo no</th>
                            <td>{index}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{description}</td>

                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                {
                                    status ?
                                        (
                                            <button
                                                className="btn btn-success text-white"
                                                onClick={() => updateStatusFunction(todoId, false)}
                                            > <i className="fa fa-check"></i> Undo?  </button>

                                        ) : (
                                            <button
                                                className="btn btn-warning text-white"
                                                onClick={() => updateStatusFunction(todoId, true)}
                                            >
                                                Mark as done?
                                        </button>

                                        )
                                }
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <button
                                    className="btn btn-block btn-success"
                                    onClick={() => onOpenModal(todoId, that)}
                                >

                                    <i className="fa fa-pencil"></i>
                                    &nbsp; Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-block btn-danger"
                                    onClick={() => {
                                        removeFunction(todoId, that)
                                    }}>
                                    <i className="fas fa-trash-alt"></i>
                                    &nbsp; Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );


export default ListContainer;