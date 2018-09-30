import React, { Component } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import "../App.css";
class AppContainer extends Component {
    render() {
        return (
            <div>
                <Form />
                <TodoList />
            </div>
        );
    };
};

export default AppContainer;