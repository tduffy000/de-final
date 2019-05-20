import React, { Component } from "react";

const Checkbox = props => (
  <input type="checkbox" {...props} />
)

class CreateList extends Component {
  render() {
    return (
      <div>
        <h2>Manage Todo List</h2>
        <form>
          <h3>Current Todos</h3>
          <label>
            <Checkbox
              //checked={this.state.checked}
              //onChange={this.handleCheckboxChange}
            />
            <span>Todo1</span>
          </label>
          <br/>
          <label>
            <Checkbox
              //checked={this.state.checked}
              //onChange={this.handleCheckboxChange}
            />
            <span>Todo2</span>
          </label>
          <br/>
          <br/>
          <h3>Add Todo</h3>
          <label>
            <input type="text" name="TodoText" /><br/>
          </label>
          <br/>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}
export default CreateList;
