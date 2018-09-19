import React, { Component } from 'react'
import Modal from "react-responsive-modal";
import ListContainer from "./ListContainer";
import swal from "sweetalert";
import { apiEndPoint } from "../ApiEndPoint";
class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            text: '',
            desc: '',
            open: false,
            updatedTitle: '',
            updatedDescription: ''
        }
        this.downloadAllTodos = this.downloadAllTodos.bind(this);
        this.addTodos = this.addTodos.bind(this);
        this.onchangeTodo = this.onchangeTodo.bind(this);
        this.onchangeDesc = this.onchangeDesc.bind(this);
        // this.removeTodo = this.removeTodo.bind(this);
        // this.handleDoneStatus = this.handleDoneStatus.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.updateFunction = this.updateFunction.bind(this);
        this.getSpecificTask = this.getSpecificTask.bind(this);
    };

    componentDidMount() {
        this.downloadAllTodos();
    }

    // +========= Get All Todos ==========+
    downloadAllTodos() {
        fetch(`https://ultimate-todo-web-postgres.herokuapp.com/todo/api/v1.0/todos`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    todos: data
                })
                console.log(data)
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

    // +============ add a todo ===========+

    addTodos(e) {
        e.preventDefault();
        fetch(`https://ultimate-todo-web-postgres.herokuapp.com/todo/api/v1.0/todos`, {
            method: "POST",
            body: JSON.stringify({
                title: this.state.text,
                description: this.state.desc,
                done: false
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(jsondocs => jsondocs.json())
            .then(doc => {
                console.log(doc);
                if (doc) {
                    this.downloadAllTodos();
                }
                swal('Task added!')
            })
            .catch(error => {
                console.log(error)
            });
    }

    onchangeDesc(e) {
        this.setState({ desc: e.target.value });
    }

    onchangeTodo(e) {
        this.setState({ text: e.target.value });
    }


    // +=============== remove a todo ==============+
    removeTodo(id, that) {
        console.log(that);
        console.log('removeTodo', id);
        fetch(`https://ultimate-todo-web-postgres.herokuapp.com/todo/api/v1.0/todos/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                that.downloadAllTodos()
            })
            .catch(err => console.log(err));
    }

    // + ============= get a specific Todo =============+

    getSpecificTask(id) {
        console.log(id);
        fetch(`${apiEndPoint.link}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    handleDoneStatus(task) {
        console.log('handleDoneTask')

    }

    // +================== update a todo ==============+

    updateFunction(e, that) {
        e.preventDefault();
        const id = localStorage.getItem('id');
        fetch(`https://localhost:5001/todo/api/v1.0/todos/${id}`, {
            mehtod: 'put',
            body: {
                title: this.state.updatedTitle,
                description: this.state.updatedDescription
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                that.downloadAllTodos();
            })
    }

    // + ====================== render method ================+
    render() {
        const { open } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>
                            <br /><br />
                            <h3 className="text-danger">TodoList  (Part-2 Step-1)</h3>
                            <form onSubmit={this.addTodos}>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input type="text" required value={this.state.text} onChange={this.onchangeTodo} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter Todos" /> <br />
                                        <input type="text" required value={this.state.desc} onChange={this.onchangeDesc} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter Description" />
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
                                        status={todo.status}
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


