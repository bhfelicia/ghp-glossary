import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTerms } from "./store/terms";
import AddTerm from "./AddTerm";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      terms: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ category: this.props.category, terms: this.props.terms });
    }
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
        <AddTerm />
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
