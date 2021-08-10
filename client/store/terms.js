import axios from "axios";

const GET_TERMS = "GET_TERMS";

export const getTerms = (category) => ({
  type: GET_TERMS,
  category,
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
