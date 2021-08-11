import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createTerm } from "./store/terms";

class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      definition: "",
      isDefined: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addTerm(
      {
        title: this.state.title,
        definition: this.state.definition,
        isDefined: true,
      },
      this.props.match.params.id
    );
    this.setState({ title: "", definition: "", isDefined: false });
  }
  render() {
    console.log(this.props);
    const { title, definition } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <form onSubmit={onSubmit}>
        <h3>Add a Term</h3>
        <div>
          <input
            name="title"
            value={title}
            onChange={onChange}
            placeholder="title"
          />
          <textarea
            name="definition"
            value={definition}
            onChange={onChange}
            placeholder="definition"
          ></textarea>
          <button>Save</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  addTerm: (term, id) => dispatch(createTerm(term, id)),
});

export default withRouter(connect(null, mapDispatchToProps)(AddTerm));
