import { weatherActionTypes } from "./weather.types";

const initialcurrentState = {
    list:{
        items: [],
        loading: false,
        error: null
    }
    
  };
  
  const weatherReducer = (currentState = initialcurrentState, action) => {
    switch (action.type) {
      case weatherActionTypes.FETCH_DATA_START:
        return {
          ...currentState,
          list:{
            items: [],
            loading: true,
            error: null
        }
        };
      case weatherActionTypes.FETCH_DATA_SUCCESS:
        return {
          ...currentState,
          list:{
            items: action.payload,
            loading: false,
            error: null
        }
        };
      case weatherActionTypes.FETCH_DATA_FAILURE:
        return {
          ...currentState,
          list:{
            items: [],
            loading: false,
            error: action.payload
        }
        };
      default:
        return currentState;
    }
  };
  
  export default weatherReducer;
  