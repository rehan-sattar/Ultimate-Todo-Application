import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insertTodoToFireStore } from "../store/ActionCreators";
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
                <fieldset>
                    <legend>Ultimate Todo App</legend>
                    <form onSubmit={this.handleSubmitForm}>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            onChange={(e) => this.setState({ title: e.target.value })} />
                        <br />
                        <br />
                        <textarea
                            placeholder="Description"
                            required
                            onChange={(e) => this.setState({ description: e.target.value })} >
                        </textarea>
                        <br />
                        <br />
                        <button type={"Submit"}>Add Task</button>
                    </form>
                </fieldset>
            </div>
        );
    };
};

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    inserTodo: (Todostate) => insertTodoToFireStore(Todostate)
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Form);