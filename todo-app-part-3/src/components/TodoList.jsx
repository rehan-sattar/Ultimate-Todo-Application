import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-responsive-modal";
import {
    getAllTodosFromFireStore,
    deleterTodoFromFireStore,
    updateTodoInFireStore
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
        // this.handleTaskdone = this.handleTaskdone.bind(this);
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
        this.setState({
            todos: props.todos
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
    render() {
        const { open } = this.state;
        return (
            <div>
                {this.state.todos ? this.state.todos.map((todo, index) => (
                    <div key={index} style={{ margin: '0.5em 0em' }}>
                        <h5>id: {index + 1}</h5>
                        <h5>Title: {todo.title}</h5>
                        <h5>Description: {todo.description}</h5>
                        {/* <h5>Status: {false ? <p> Task completed! </p> : (<button onClick={this.handleTaskdone}>Done</button>)} </h5> */}
                        <button onClick={() => this.onOpenModal(todo.id)}>Update</button>
                        <button onClick={() => this.handleDeleteRequest(todo.id)}>Delete</button>
                    </div>
                )) : <p>No items</p>}

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
    downloadTodos: (Todostate) => getAllTodosFromFireStore(Todostate),
    deleteATask: (todoId) => deleterTodoFromFireStore(todoId),
    updateTodoTask: (newTodoObject) => updateTodoInFireStore(newTodoObject)
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);