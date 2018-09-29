import React, { Component } from "react";
import Form from "./Form";
import List from "./TodoList";
import "../App.css";
class AppContainer extends Component {
    render() {
        return (
            <div>
                <Form />
                <List />
            </div>
        );
    };
};

export default AppContainer;