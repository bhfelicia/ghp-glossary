import axios from "axios";

const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data: categories } = await axios.get("/api/categories");
      dispatch(getCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
};
