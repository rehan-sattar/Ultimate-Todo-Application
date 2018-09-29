import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-responsive-modal";
import {
    getAllTodosFromDatabase,
    deleterTodoFromDatabase,
    updateTodoInDatabase,
    taskDoneAttempt
} from "../store/ActionCreators";

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            open: false,
            updateTitle: '',
            updateDescription: '',
            updateDoneStatus: false,

            addAction: false

        };
        this.handleTaskdone = this.handleTaskdone.bind(this);
        this.handleDeleteRequest = this.handleDeleteRequest.bind(this);
        this.handleUpdateRequest = this.handleUpdateRequest.bind(this);
    };

    onOpenModal = (id) => {
        this.setState({ open: true });
        localStorage.setItem('updatedTodoId', id);
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.props.downloadTodos();
    }

    componentWillReceiveProps(props) {
        console.log(props)
        console.log(props);
        this.setState({
            todos: props.todos.todos
        });
    };

    handleDeleteRequest(todoId) {
        this.props.deleteATask(todoId);
    }


    handleUpdateRequest(e) {
        e.preventDefault();
        const { updateDescription, updateTitle, updateDoneStatus } = this.state;
        this.props.updateTodoTask({
            updateDescription,
            updateTitle,
            updateDoneStatus,
            todoId: localStorage.getItem('updatedTodoId')
        });
        this.onCloseModal();
    }

    handleTaskdone(todo, status) {
        this.props.changeDoneStatus(todo, status);
    }
    render() {
        const { open } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-10 col-sm-12">
                            {this.state.todos ? this.state.todos.map((todo, index) => {
                                if (!todo.doneStatus) {
                                    console.log("Done Status: ",todo.done)
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

                                    console.log("Done Status: ",todo.done)
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
                    </div >
                </div >

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
            </div >
        );
    };
};

const mapStateToProps = (state) => {
    return {
        todos: state.allTodos,
        addedTodoAction: state.addedTodo
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
    downloadTodos: (Todostate) => getAllTodosFromDatabase(Todostate),
    deleteATask: (todoId) => deleterTodoFromDatabase(todoId),
    updateTodoTask: (newTodoObject) => updateTodoInDatabase(newTodoObject),
    changeDoneStatus: (todo, status) => taskDoneAttempt(todo,status )
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);