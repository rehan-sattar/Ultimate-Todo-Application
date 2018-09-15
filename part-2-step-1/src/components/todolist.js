import React, {Component} from 'react'

class TodoList extends Component {
    constructor(){
        super();

        this.addTodos = this.addTodos.bind(this);
        this.onchangeTodo = this.onchangeTodo.bind(this);
        this.onchangeDesc = this.onchangeDesc.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);

        this.state = {
            todos : [],
            text: '',
            desc: ''
        }
    }

    addTodos(e){
        e.preventDefault();
        // this.setState({todos: [...this.state.todos]});
        //const {desc, text} = this.state;
        const newTodo = {
            text: this.state.text,
            desc: this.state.desc,
            status: false
        };
        console.log(newTodo)
        
        this.setState((prevState)  => {
            //console.log("Prevstate", prevState.todos)
            //console.log('result', this.state.todos);
            return {
                todos: prevState.todos.concat(newTodo) 
            }            
        });
        this.setState({desc : ''});    
        this.setState({text : ''});    
    }

    onchangeDesc(e) {        
        this.setState({desc: e.target.value});
        //console.log(e.target.value);
    }

    onchangeTodo(e) {
        this.setState({text: e.target.value});
        //console.log(e.target.value);
    }

    removeTodo(ind){
        ind = ind - 1;
        //console.log('event:', ind);
        const slicedNewTodos = this.state.todos.slice(0, ind).concat(this.state.todos.slice(ind + 1));

        //console.log('new:', slicedNewTodos);
        this.setState({ todos: slicedNewTodos});
    }

    completeTodo(ind) {
        ind = ind - 1;
        //console.log('ind:', ind);

        let array = this.state.todos;
        array[ind].status = true;
        
        this.setState((prevState) => {
            return {
                todos : array
            }
        });
        console.log('test:', this.state.todos);        
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>
                            <br/><br/>
                            <h3 className="text-danger">TodoList  (Part-2 Step-1)</h3>
                            <form onSubmit={this.addTodos}>
                                <div className="form-row">
                                    <div className="form-group col-md-12">                                
                                        <input type="text" value={this.state.text} onChange={this.onchangeTodo} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter Todos" /> <br />
                                        <input type="text" value={this.state.desc} onChange={this.onchangeDesc} className="form-control form-control-sm" aria-describedby="emailHelp" placeholder="Enter Description" />
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
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                    <th>S #</th>
                                    <th>Todos</th>
                                    <th>Description</th>
                                    <th>Complete</th>
                                    <th>Delete</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.todos.map((todo, i) => {
                                        return(
                                            <tr key={i}>
                                                <td>{i = i + 1}</td>
                                                <td>{todo.text}</td>                                    
                                                <td>{todo.desc}</td>
                                                <td> {this.state.status === true ? 'Yes' : <a href="javascript:void(0)" onClick={() => this.completeTodo(i)}> No </a> } </td>
                                                <td><a href="javascript:void(0)" onClick={() => { if (window.confirm('Are you sure you wish to delete this todo?')) this.removeTodo(i)}}><i className="fas fa-trash-alt"></i></a></td>
                                            </tr>
                                        )

                                    })}
                                     
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default TodoList;

