import axios from "axios";

const GET_QUESTIONS = "GET_QUESTIONS";
const ADD_QUESTION = "ADD_QUESTION";

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const { data: questions } = await axios.get("/api/questions");
      dispatch(getQuestions(questions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createQuestion = (question) => {
  return async (dispatch) => {
    const { data: newQ } = await axios.post("/api/questions", question);
    dispatch(addCategory(newQ));
  };
};

const initialState = {
  questions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.question] };
    default:
      return state;
  }
};
