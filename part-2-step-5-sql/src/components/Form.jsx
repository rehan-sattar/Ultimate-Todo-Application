import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insertTodoToDatabase } from "../store/ActionCreators";
import "../App.css";
class Form extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            doneStatus: false,
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    };

    handleSubmitForm(event) {
        event.preventDefault();
        this.props.inserTodo(this.state);
        this.setState({
            title: '',
            description: '',
            doneStatus: false,
        });
    };
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-sm-12" id="form-container">
                            <h2 className="text-center" id="addTaskHeadline"> <i className="fas fa-pencil-alt"></i> Add your task</h2>
                            <form onSubmit={this.handleSubmitForm} className="p-3">
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

            </div>
        );
    };
};

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    inserTodo: (Todostate) => insertTodoToDatabase(Todostate)
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Form);