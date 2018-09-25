import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Todo from "./components/todolist";
import ListContainer from './components/ListContainer'
import store from "./store/store";
import Modal from "react-responsive-modal";
configure({ adapter: new Adapter() });



describe('Todolist Component Testing', function() {
  const wrapper = shallow(<Todo store={store}  />); 
  it('Renders ListContainer Components', function() {
    expect(wrapper.find(<ListContainer />))
  });
  it('Render Div elements',() => {
    expect(wrapper.find('div'))
  })
  it('Render input elements',() => {
    expect(wrapper.find('input'))
  })
  it('Render h3 elements',() => {
    expect(wrapper.find('h3'))
  })
  it('Render Modal elements',() => {
    expect(wrapper.find(Modal))
  })
});

describe("List Container Component Testing",() => {
  const props= {
    index:1,
    id:"001",
    title:"Hello World",
    description:"Hello Pakistan",
    status:true,
    removeFunction:() => {},
    updateStatusFunction:() => {},
    onOpenModal:() => {}
    }
  it("Checking Of Recieving Props",() => {
    const wrapper = shallow(<Todo store={store} />);
    wrapper.find(ListContainer).forEach(node => {
      expect(node.props()).to.equal(props);
    })
  })
  it('Render div of class card element',() => {
    const wrapper = shallow(<ListContainer />);
    expect(wrapper.find('.card')).to.have.lengthOf(1);
  })
  it('Render tbody element',() => {
    const wrapper = shallow(<ListContainer />);
    expect(wrapper.find('tbody')).to.have.lengthOf(1);
  })
  it('Render tr elements',() => {
    const wrapper = shallow(<ListContainer />);
    expect(wrapper.find('tr')).to.have.lengthOf(5);
  })
})
