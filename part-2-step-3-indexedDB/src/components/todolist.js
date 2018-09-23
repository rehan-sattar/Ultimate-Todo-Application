import React, { Component } from 'react'
import Modal from "react-responsive-modal";
import ListContainer from "./ListContainer";
import swal from "sweetalert";

import database from "./dexie";


class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            open: false,
            title: '',
            description: '',
            doneStatus: false,
            updatedTitle: '',
            updatedDescription: '',
            ref: undefined
        }
        this.addTodoHandler = this.addTodoHandler.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.updateFunction = this.updateFunction.bind(this);
        this.handleDoneStatus = this.handleDoneStatus.bind(this);
    };

    // retrieving all records 
    componentDidMount() {
        database.table('todos')
            .toArray()
            .then(todos => this.setState({ todos }))
    }

    // adding data to database

    addTodoHandler(e) {
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
                    todos: newTodoList
                })
                swal('Todo Added!', 'Your task has been Added', 'success');

            })
    }


    // remove functionality  
    removeTodo(id) {
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


    // ****** modal's controllers *******
    onOpenModal(id, that) {
        this.setState({ open: true });
        localStorage.setItem('id', id);
    };

    onCloseModal() {
        this.setState({ open: false });
    };

    handleDoneStatus(todoId, status) {
        console.log(todoId, status)
        database.table('todos')
            .update(todoId, { doneStatus: status })
            .then(response => {
                if (response) {
                    console.log('updated')
                    return database.table('todos').toArray();
                }
            })
            .then(todos => {
                swal('Status updated!', 'Your status has been updated' , 'success')
                this.setState({ todos })
            })
    }

    // +================== update a todo ==============+

    updateFunction(e) {
        e.preventDefault();
        console.log('updated function called')
        const id = localStorage.getItem('id');
        console.log(id);

        database.table('todos')
            .update(Number(id), {
                title: this.state.updatedTitle,
                description: this.state.updatedDescription
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


    // + ====================== render method ================+
    render() {
        const { open } = this.state;
        return (
            <div className="container" >
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>
                            <br /><br />
                            <h3 className="text-danger">TodoList  (Part-2 Step-1)</h3>
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
                                        todoId={todo.id}
                                        title={todo.title}
                                        description={todo.description}
                                        status={todo.doneStatus}
                                        removeFunction={this.removeTodo}
                                        updateStatusFunction={this.handleDoneStatus}
                                        onOpenModal={this.onOpenModal}
                                        that={this}
                                    />
                                )

                            })}

                        </div>
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <form onSubmit={this.updateFunction}>
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

export default TodoList;


