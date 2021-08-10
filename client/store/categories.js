import axios from "axios";

const GET_CATEGORIES = "GET_CATEGORIES";
const ADD_CATEGORY = "ADD_CATEGORY";

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category,
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

export const createCategory = (category) => {
  return async (dispatch) => {
    const { data: newCat } = await axios.post("/api/categories", category);
    dispatch(addCategory(newCat));
  };
};

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.category] };
    default:
      return state;
  }
};
