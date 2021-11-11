import axios from "axios";

export const CHECK_AUTHORIZATION = "CHECK_AUTHORIZATION";
export const checkAuth = (authenticated) => ({
  type: CHECK_AUTHORIZATION,
  payload: authenticated,
});

export const START_REQUEST = "START_REQUEST";
export const AUTHENTICATE = "AUTHENTICATE";
export const FAILED_REQUEST = "FAILED_REQUEST";
export const FINISH_REQUEST = "FINISH_REQUEST";



export const login = (userInfo) => (dispatch) => {
    dispatch({ type: START_REQUEST });
    axios
      .post("https://potluck-planning-app.herokuapp.com/api/auth/login", userInfo) 
      .then((res) => {
        dispatch({ type: AUTHENTICATE, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FAILED_REQUEST, payload: err });
      })
      .finally(() => {
        dispatch({ type: FINISH_REQUEST })
      })
  };