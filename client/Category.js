import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTerms } from "./store/terms";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      terms: [],
    };
  }
  async componentDidMount() {
    await this.props.getTerms(this.props.match.params.id);
    this.setState({ category: this.props.category, terms: this.props.terms });
  }
  render() {
    const { category, terms } = this.state;
    return (
      <div>
        <h1>{category.name}</h1>
        <ul>
          {terms.map((term, idx) => {
            return (
              <li key={idx}>
                {term.title}:{" "}
                {term.definition ? term.definition : "To be defined"}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  category: state.terms.category,
  terms: state.terms.category.terms,
});

const mapDispatchToProps = (dispatch) => ({
  getTerms: (id) => dispatch(fetchTerms(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Category);
