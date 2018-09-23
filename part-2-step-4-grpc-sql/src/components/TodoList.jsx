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
        console.log('Component Will recieve Props: ', props);
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
    }

    handleTaskdone(todo) {
        this.props.changeDoneStatus(todo);
    }
    render() {
        const { open } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-sm-12">
                            {this.state.todos ? this.state.todos.map((todo, index) => (
                                <div key={index} className="card my-3">
                                    <div className="card-body">
                                        <h5>id: {index + 1}</h5>
                                        <hr/>
                                        <h5>Title: {todo.title}</h5>
                                        <hr/>
                                        <h5>Description: {todo.description}</h5>
                                        <hr/>
                                        <h5>Status: {todo.doneStatus === true ? <span> Task completed! </span> : (<button onClick={() => this.handleTaskdone(todo)}>Done</button>)} </h5>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            className={"btn btn-success btn-lg mx-2"}
                                            onClick={() => this.onOpenModal(todo.id)}>Update</button>
                                        <button
                                            className={"btn btn-danger btn-lg mx-2"}
                                            onClick={() => this.handleDeleteRequest(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            )) : <p>No items</p>}
                        </div>
                    </div>
                </div>

                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Update Todo</h2>
                    <form onSubmit={this.handleUpdateRequest}>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            onChange={(e) => this.setState({ updateTitle: e.target.value })} />
                        <br />
                        <br />
                        <textarea
                            placeholder="Description"
                            required
                            onChange={(e) => this.setState({ updateDescription: e.target.value })} >
                        </textarea>
                        <br />
                        <br />
                        <button type={"Submit"}>Add Task</button>
                    </form>
                </Modal>
            </div >
        );
    };
};

const mapStateToProps = (state) => ({
    todos: state.allTodos
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    downloadTodos: (Todostate) => getAllTodosFromDatabase(Todostate),
    deleteATask: (todoId) => deleterTodoFromDatabase(todoId),
    updateTodoTask: (newTodoObject) => updateTodoInDatabase(newTodoObject),
    changeDoneStatus: (todo) => taskDoneAttempt(todo)
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);