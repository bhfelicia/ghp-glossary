import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "./store/categories";
import AddCategory from "./AddCategory";

class Glossary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props.categories });
    }
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
        <AddCategory />
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
