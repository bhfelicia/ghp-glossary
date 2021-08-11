import axios from "axios";

const GET_TERMS = "GET_TERMS";
const ADD_TERM = "ADD_TERM";

export const getTerms = (category) => ({
  type: GET_TERMS,
  category,
});

export const addTerm = (term) => ({
  type: ADD_TERM,
  term,
});

export const fetchTerms = (id) => {
  return async (dispatch) => {
    try {
      const { data: category } = await axios.get(`/api/categories/${id}`);
      dispatch(getTerms(category));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTerm = (newTerm, id) => {
  return async (dispatch) => {
    try {
      const { data: term } = await axios.post(`/api/categories/${id}`, newTerm);
      dispatch(addTerm(term));
    } catch (error) {
      console.log(error);
    }
  };
};
const initialState = {
  category: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TERMS:
      return {
        ...state,
        category: action.category,
      };
    default:
      return state;
  }
};
