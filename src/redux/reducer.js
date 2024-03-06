const initialState = {
    sellerId: null,
    otherValue: "hello",
    username: ""
  };
  
 
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_AUTH":
        return {
          ...state,
          sellerId: action.payload.sellerId,
          username: action.payload.username
        };
  
        // triggered from front end with this dispatch action object: { type: "LOGOUT" }
      case "LOGOUT":
        return {
          ...state,
          sellerId: null,
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;