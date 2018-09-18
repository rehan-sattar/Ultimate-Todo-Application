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
        this.addTodos = this.addTodos.bind(this);
        this.onchangeTodo = this.onchangeTodo.bind(this);
        this.onchangeDesc = this.onchangeDesc.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.handleDoneStatus = this.handleDoneStatus.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.updateFunction = this.updateFunction.bind(this);
    }; updateFunctionupdateFunction

    // ****** modal's controllers *******
    onOpenModal(title) {
        this.setState({ open: true });
        localStorage.setItem('title', title);
    };

    onCloseModal() {
        this.setState({ open: false });
    };

    addTodos(e) {
        e.preventDefault();


        fetch(`${apiEndPoint.link}/todo/api/v1.0/addTask`, {
            method: "POST",
            body: JSON.stringify({
                text: this.state.text,
                desc: this.state.desc,
                status: false
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(jsondocs => jsondocs.json())
            .then(docs => {
                console.log(docs);
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

    removeTodo(title) {
        console.log('removeTodo')

    }

    handleDoneStatus(task) {
        console.log('handleDoneTask')

    }
    updateFunction(e) {
        console.log('update Function')

    }
    render() {
        const { open } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>
                            <br /><br />
                            <h3 className="text-danger">TodoList  (Part-2 Step-1)</h3>
                            <form onSubmit={this.addTodos}>test
                            <div className="form-row">Good job!
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
                                        id={i + 1}
                                        title={todo.text}
                                        description={todo.desc}
                                        status={todo.status}
                                        removeFunction={this.removeTodo}
                                        updateStatusFunction={this.handleDoneStatus}
                                        onOpenModal={this.onOpenModal}
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




// all routes: 

// /todo/api/v1.0/tasks => add task
// /todo/api/v1.0/tasks/:id => get a specific task
// /todo/api/v1.0/tasks/:id => update a task
// /todo/api/v1.0/tasks/:id => delete a task
// /todo/api/v1.0/tasks => get All tasks