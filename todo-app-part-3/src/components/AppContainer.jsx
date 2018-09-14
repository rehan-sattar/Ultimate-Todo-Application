import React, { Component } from "react";
import Form from "./Form";
import List from "./TodoList";

class AppContainer extends Component {
    render() {
        return(
            <div>
                <Form />
                <List />
            </div>
        );
    };
};

export default AppContainer;