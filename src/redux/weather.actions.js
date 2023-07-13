
import { fetchWeatherData } from './weather.utils';

export const fetchWeatherDataAction = ({location,type}) => {
    console.warn("action",location,type);
    return async (dispatch) => {
        await fetchWeatherData(dispatch,{ location,type});
      };
};

