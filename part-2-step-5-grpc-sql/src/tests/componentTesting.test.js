import React from "react";
import { shallow } from "enzyme";
import "../SetupTest";
import { Provider } from "react-redux"
import configureStore from "redux-mock-store";
import AppContainer from "../components/AppContainer";
import Form from "../components/Form";
import TodoList from "../components/TodoList";

const mockStore = configureStore();
const store = mockStore({
    allTodos: [],
    error: '',
    addedTodo: false
})
// shallow Rendering of AppContainer

it('should render the AppContainer Component', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.length).toEqual(1);
});


it('should check the nodes | child Components', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.contains([
        <Form />,
        <TodoList />
    ])
    )
});


// form container shallow rendering
it('should render the Form component', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <Form />
        </Provider>
    );
    expect(wrapper.length).toEqual(1);
});


// snapshot testing

it('should render and snap the AppContainer Component | snapshot testing', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper).toMatchSnapshot();
});

it('should render and snap the Form Component | snapshot testing', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <Form />
        </Provider>);
    expect(wrapper).toMatchSnapshot();
});

it('should render and snap the TodoList Component | snapshot testing', () => {
    const wrapper = shallow(<Provider store={store}>
        <TodoList />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
});

