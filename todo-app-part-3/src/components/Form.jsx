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
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-8 col-sm-12 m-5 p-5 bg-white">
                            <h2 className="tex-center">Add your Daily tasks</h2>
                            <form onSubmit={this.handleSubmitForm}>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    required
                                    className="form-control"
                                    onChange={(e) => this.setState({ title: e.target.value })} />
                                <br />
                                <br />
                                <textarea
                                    placeholder="Description"
                                    required
                                    className="form-control"
                                    onChange={(e) => this.setState({ description: e.target.value })} >
                                </textarea>
                                <br />
                                <br />
                                <button type={"Submit"} className="btn btn-primary btn-lg">Add Task</button>
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
    inserTodo: (Todostate) => insertTodoToFireStore(Todostate)
},
    dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Form);