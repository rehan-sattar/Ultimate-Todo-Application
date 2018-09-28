import React, { Component } from "react";
import Modal from "react-responsive-modal";
import swal from "sweetalert";
import "../App.css";
class AppContainer extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            title: '',
            description: '',
            doneStatus: false,
            open: false,
            updateTitle: '',
            updateDescription: '',
            updateDoneStatus: false,
        };
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleTaskdone = this.handleTaskdone.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    };

    handleAddTask(e) {
        e.preventDefault();
        const todoObject = {
            title: this.state.title,
            description: this.state.description,
            doneStatus: this.state.doneStatus
        };

        this.setState({
            todos: this.state.todos.concat(todoObject),
            title: '',
            description: '',
            doneStatus: false
        });
    };

    handleDeleteRequest(todoId) {
        this.setState({
            todos: this.state.todos.filter((item, index) => index !== todoId)
        });
        swal('Wohaaa!', 'Your task has been deleted', 'success');
    };

    handleUpdateRequest(e) {
        e.preventDefault();
        const id = localStorage.getItem('updatedTodoId');
        const todoObject = {
            title: this.state.updateTitle,
            description: this.state.updateDescription,
        };
        const todos = this.state.todos.filter((item, index) => {
            if (index === Number(id)) {
                item.title = todoObject.title;
                item.description = todoObject.description
            };
            return item;
        });

        this.setState({
            todos
        });
        this.onCloseModal();
        swal('Wohaaa!', 'Your task has been updated', 'success');

    };
    handleTaskdone(id) {
        const newTodoList = this.state.todos.filter((todo, index) => {
            if (index === id) {
                todo.doneStatus = !todo.doneStatus;
            }
            return todo;
        });
        this.setState({
            todos: newTodoList
        });
        swal('Wohamiii!', 'Your task status is updated!', 'success');

    };


    onOpenModal = (id) => {
        this.setState({ open: true });
        localStorage.setItem('updatedTodoId', id);
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-sm-12" id="form-container">
                            <h2 className="text-center" id="addTaskHeadline"> <i className="fas fa-pencil-alt"></i> Add your task</h2>
                            <form onSubmit={this.handleAddTask} className="p-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={(e) => this.setState({ title: e.target.value })} />
                                <br />
                                <textarea
                                    placeholder="Description"
                                    required
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={(e) => this.setState({ description: e.target.value })} >
                                </textarea>
                                <br />
                                <button type={"Submit"} className="btn cstmBtn btn-block btn-lg"> <i className="fa fa-plus"></i> Add Task</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Add task form completed here */}


                {/* Other apps */}



                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10 col-sm-12">
                            {this.state.todos ? this.state.todos.map((todo, index) => {
                                if (!todo.doneStatus) {
                                    return (
                                        <div className="card my-5" key={index}>
                                            <div className="card-body">
                                                <h3 className="todotext">
                                                    {todo.title}
                                                </h3>
                                                <p className="todotext">
                                                    {todo.description}
                                                </p>
                                                <div className="btn-group float-right">
                                                    <button
                                                        onClick={() => this.handleTaskdone(index)}
                                                        className="btn btn-outline-success btn-lg card_btns"> <i className="fa fa-check"></i> </button>
                                                    <button
                                                        onClick={() => this.onOpenModal(index)}
                                                        className="btn btn-outline-warning btn-lg card_btns"> <i className="fas fa-pencil-alt"></i> </button>
                                                    <button
                                                        onClick={() => this.handleDeleteRequest(index)}
                                                        className="btn btn-outline-danger btn-lg card_btns"> <i className="fa fa-trash"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="card my-5 doneBody" key={index}>
                                            <div className="card-body">
                                                <h3 className="todotext crossed">
                                                    {todo.title}
                                                </h3>
                                                <p className="todotext crossed">
                                                    {todo.description}
                                                </p>
                                                <div className="btn-group float-right">
                                                    <button
                                                        onClick={() => this.handleTaskdone(index)}
                                                        className="btn btn-outline-warning btn-lg card_btns"> <i className="fas fa-undo"></i> </button>

                                                    <button
                                                        onClick={() => this.handleDeleteRequest(index)}
                                                        className="btn btn-outline-danger btn-lg card_btns"> <i className="fa fa-trash"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }) : <p>No items</p>}
                        </div>
                    </div>
                </div>

                {/* MODAL FOR TODO */}

                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2 className="text-center my-2 pt-2">Update Todo</h2>
                    <form onSubmit={this.handleUpdateRequest}>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            className="form-control"
                            onChange={(e) => this.setState({ updateTitle: e.target.value })} />
                        <br />
                        <br />
                        <textarea
                            placeholder="Description"
                            required
                            className="form-control"
                            onChange={(e) => this.setState({ updateDescription: e.target.value })} >
                        </textarea>
                        <br />
                        <br />
                        <button className="btn btn-primary btn-block" type={"Submit"}>Update</button>
                    </form>
                </Modal>
            </div>
        );
    };
};

export default AppContainer;