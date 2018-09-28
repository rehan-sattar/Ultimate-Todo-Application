import React, { Component } from "react";
import Modal from "react-responsive-modal";
import swal from "sweetalert";
import database from "./dexie";
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

    //===== reading all todos=====
    componentDidMount() {
        database.table('todos')
            .toArray()
            .then(todos => this.setState({ todos }))
    }


    //=====Add todo handler


    handleAddTask(e) {
        const todoObject = {
            title: this.state.title,
            description: this.state.description,
            doneStatus: this.state.doneStatus
        }
        e.preventDefault();
        database.table('todos')
            .add(todoObject)
            .then(id => {
                // fetching the previouse details and creating updated list.
                const newTodoList = [
                    ...this.state.todos,
                    Object.assign({}, todoObject, { id })
                ];

                //setting to state.
                this.setState({
                    todos: newTodoList,
                    title:'',
                    description:''
                })
                swal('Todo Added!', 'Your task has been Added', 'success');

            })
    }
    // =====remove====

    handleDeleteRequest(id) {
        database.table('todos')
            .delete(id)
            .then(() => {
                // creating a new LISt 

                const newTodoList = this.state.todos.filter(item => item.id !== id);

                //setting to state.
                this.setState({
                    todos: newTodoList
                });
                swal('Todo Deleted!', 'Your task has been Deleted', 'success');

            });
    };

    //======update======

    handleUpdateRequest(e) {
        e.preventDefault();
        const id = localStorage.getItem('updatedTodoId');
        database.table('todos')
            .update(Number(id), {
                title: this.state.updateTitle,
                description: this.state.updateDescription,
                doneStatus: false
            })
            .then(response => {
                if (response) {
                    return database.table('todos').toArray()
                }
            }).then(todos => {
                swal('Todo updated!', 'Your task has been updated', 'success');
                this.setState({ todos })
                this.onCloseModal();
            })
    }


    //=======handle task done======

    handleTaskdone(todoId, status) {
        database.table('todos')
            .update(todoId, { doneStatus: status })
            .then(response => {
                if (response) {
                    console.log('updated')
                    return database.table('todos').toArray();
                }
            })
            .then(todos => {
                swal('Status updated!', 'Your status has been updated', 'success')
                this.setState({ todos })
            })
    }
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
                                                        onClick={() => this.handleTaskdone(todo.id, true)}
                                                        className="btn btn-outline-success btn-lg card_btns"> <i className="fa fa-check"></i> </button>
                                                    <button
                                                        onClick={() => this.onOpenModal(todo.id)}
                                                        className="btn btn-outline-warning btn-lg card_btns"> <i className="fas fa-pencil-alt"></i> </button>
                                                    <button
                                                        onClick={() => this.handleDeleteRequest(todo.id)}
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
                                                        onClick={() => this.handleTaskdone(todo.id, false)}
                                                        className="btn btn-outline-warning btn-lg card_btns"> <i className="fas fa-undo"></i> </button>

                                                    <button
                                                        onClick={() => this.handleDeleteRequest(todo.id)}
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