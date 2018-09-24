import React, { Component } from 'react'
import Modal from "react-responsive-modal";
import ListContainer from "./ListContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    downloadAllTodos,
    addTodos,
    removeTodo,
    updateFunction,
    markAsDone
} from "../store/Actions";

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            title: '',
            description: '',
            open: false,
            status: false,
            updatedTitle: '',
            updatedDescription: '',

        }

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.addTodoHandler = this.addTodoHandler.bind(this);
        this.updateTodoHandler = this.updateTodoHandler.bind(this);
        this.removeTodoHandler = this.removeTodoHandler.bind(this);
        this.markAsDoneHandler = this.markAsDoneHandler.bind(this);

    };

    componentDidMount() {
        this.props._downloadAllTodos();
    }

    componentWillReceiveProps(props) {
        this.setState({
            todos: props.todos
        });
    }
    // ****** modal's controllers *******
    onOpenModal(id) {
        this.setState({ open: true });
        localStorage.setItem('id', id);
    };

    onCloseModal() {
        this.setState({ open: false });
    };

    addTodoHandler(e) {
        e.preventDefault();
        this.props.addThisTodo(this.state);
        this.setState({
            title: '',
            description: '',
        });
    };

    removeTodoHandler(id) {
        console.log(id);
        this.props.removeAtodo(id);
    };

    updateTodoHandler(e) {
        e.preventDefault();
        console.log(this.state);
        let id = localStorage.getItem('id');
        const updatedObject = {
            id,
            Title: this.state.updatedTitle,
            Description: this.state.updatedDescription
        };
        this.props.updateThisTodo(updatedObject);
        this.onCloseModal();
    }

    markAsDoneHandler(id, status) {
        console.log(id);
        this.props._markAsDone(id, status)
    }

    render() {
        const { open } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>

                            <br /><br />
                            <h3 className="text-danger">TodoList  (Part-2 Step-4)</h3>
                            <form onSubmit={this.addTodoHandler}>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input
                                            type="text"
                                            required
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                            className="form-control form-control-sm"
                                            placeholder="Enter Todos" /> <br />
                                        <input
                                            type="text"
                                            required
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                            className="form-control form-control-sm"
                                            placeholder="Enter Description" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="test">&nbsp;</label>
                                        <button type="submit" className="btn btn-primary btn-sm">Insert Todo</button>
                                    </div>
                                </div>

                            </form>

                            <h4>All Todos</h4>
                            {this.state.todos.map((todo, i) => {
                                return (
                                    <ListContainer
                                        index={i + 1}
                                        id={todo._id}
                                        title={todo.Title}
                                        description={todo.Description}
                                        status={todo.Done}
                                        removeFunction={this.removeTodoHandler}
                                        updateStatusFunction={this.markAsDoneHandler}
                                        onOpenModal={this.onOpenModal}
                                        that={this}
                                    />
                                )

                            })}

                        </div>
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <form onSubmit={this.updateTodoHandler}>
                        <div classNatesttestme="form-row">
                            <div className="form-group col-md-12">
                                <input
                                    type="text"
                                    onChange={(e) => { this.setState({ updatedTitle: e.target.value }) }}
                                    className="form-control form-control-sm"

                                    placeholder="Enter Todos"

                                /> <br />
                                <input
                                    type="text"
                                    onChange={(e) => { this.setState({ updatedDescription: e.target.value }) }}
                                    className="form-control form-control-sm"

                                    placeholder="Enter Description" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="test">&nbsp;</label>
                                <button type="submit" className="btn btn-primary btn-sm">Insert Todo</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        _downloadAllTodos: () => downloadAllTodos(), //..,
        removeAtodo: (id) => removeTodo(id), //...,
        updateThisTodo: (updatedObject) => updateFunction(updatedObject),  // ... 
        addThisTodo: (todoObject) => addTodos(todoObject),
        _markAsDone: (id, status) => markAsDone(id, status)  // ........
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

