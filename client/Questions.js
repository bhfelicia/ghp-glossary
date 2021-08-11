import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchQuestions } from "./store/questions";
// import AddQuestion from "./AddQuestion";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props.questions });
    }
  }
  async componentDidMount() {
    await this.props.getQuestions();

    this.setState({ questions: this.props.questions });
  }
  render() {
    console.log(this.props, "state", this.state);
    const { questions } = this.state;

    return (
      <div>
        <h1>GHP MiniLearn Questions</h1>
        <ul>
          {questions.map((question, idx) => {
            return (
              <Link to={`/glossary/${question.id}`} key={idx}>
                <li key={idx}>{question.inquiry}</li>
                <p>{question.description}</p>
              </Link>
            );
          })}{" "}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return { questions: state.questions.questions };
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
