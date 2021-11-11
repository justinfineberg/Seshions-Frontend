import {
  CHECK_AUTHORIZATION,
  AUTHENTICATE,
  FINISH_REQUEST,
  START_REQUEST,
} from "../actions/index";

const initialState = {
  authenitcated: localStorage.getItem("token") || false,
  makingRequest: false,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case CHECK_AUTHORIZATION:
      return {
        ...state,
        authenticated: actions.payload,
      };
    case START_REQUEST:
      return {
        ...state,
        makingRequest: true,
      };
    case FINISH_REQUEST:
      return {
        ...state,
        makingRequest: false,
      };
    case AUTHENTICATE:
      localStorage.setItem("token", actions.payload.token);
      return {
        ...state,
        authenticated: true,
      };
  }
};

export default reducer;
