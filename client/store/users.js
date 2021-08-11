import axios from "axios";

const GET_USERS = "GET_USERS";
const GET_USER = "GET_USER";
const CREATE_USER = "CREATE_USER";
const USER_BY_ID = "USER_BY_ID";

export const userById = (user) => ({
  type: USER_BY_ID,
  user,
});

export const getUserById = (userId) => {
  return async (dispatch) => {
    try {
      const headerToken = {
        headers: { authorization: window.localStorage.getItem("token") },
      };
      const { data: user } = await axios.get(
        `/api/users/${userId}`,
        headerToken
      );
      dispatch(userById(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const headerToken = {
        headers: { authorization: window.localStorage.getItem("token") },
      };
      const { data: users } = await axios.get("/api/users", headerToken);
      dispatch(getUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const userInfo = (user) => {
  return (dispatch) => {
    dispatch(getUser(user));
  };
};

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    const headerToken = {
      headers: { authorization: window.localStorage.getItem("token") },
    };
    const { data: user } = await axios.post(
      `/api/users/`,
      newUser,
      headerToken
    );
    dispatch(createUser(user));
  };
};

const initialState = {
  users: [],
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };
    case GET_USER:
      return { ...state, currentUser: action.user };
    case USER_BY_ID:
      return { ...state, currentUser: action.user };
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.user],
        currentUser: action.user,
      };
    default:
      return state;
  }
};
