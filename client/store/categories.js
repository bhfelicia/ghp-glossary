import axios from "axios";

const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const fetchQuestions = () => {
  return async (dispatch) => {
    try {
      const { data: categories } = await axios.get("/api/questions");
      dispatch(getCategories(categories));
    } catch (error) {
      console.log(error);
    }
  };
};
