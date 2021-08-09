export const initialState = {
  token: null
};

const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      localStorage.setItem("token", JSON.stringify(action.token));
      return { ...state, token: action.token };
    }
    case "LOAD_FROM_STORAGE": {
      const token = JSON.parse(localStorage.getItem("token")) || [];
      return {
        ...state,
        token: token
      };
    }
    default:
      return state;
  }
};

export default GlobalReducer;