import { getWeatherDataAPI } from "./api";
import { weatherActionTypes } from "./weather.types";

export const fetchWeatherData=async (dispatch, {location,type}) => {
    
    try {
      dispatch({
        type: weatherActionTypes.FETCH_DATA_START,
      });
      const response= await getWeatherDataAPI({location,type});
  
      dispatch({
        type: weatherActionTypes.FETCH_DATA_SUCCESS,
        payload: response,
      });
    } catch (exception) {
        console.warn("exception",exception.message)
      dispatch({
        type: weatherActionTypes.FETCH_DATA_FAILURE,
        payload: exception.message,
      });
    }
  };