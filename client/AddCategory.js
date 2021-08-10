import React, { Component } from "react";
import { connect } from "react-redux";
import { createCategory } from "./store/categories";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addCategory({ name: this.state.name });
    this.setState({ name: "" });
  }
  render() {
    const { name } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <h3>Add a category</h3>
        <div>
          <input
            name="name"
            value={name}
            onChange={onChange}
            placeholder="name"
          />
          <button>Save</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  addCategory: (category) => dispatch(createCategory(category, history)),
});

export default connect(null, mapDispatchToProps)(AddCategory);
