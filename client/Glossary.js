import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "./store/categories";
class Glossary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  async componentDidMount() {
    await this.props.getCategories();

    this.setState(this.props.categories);
  }
  render() {
    const { categories } = this.state;

    return (
      <div>
        <h1>GHP Glossary Categories</h1>
        <ul>
          {categories.map((category, idx) => {
            return (
              <Link to={`/glossary/${category.id}`} key={idx}>
                <li key={idx}>{category.name}</li>
              </Link>
            );
          })}{" "}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(fetchCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Glossary);
