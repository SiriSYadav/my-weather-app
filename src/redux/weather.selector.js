import { createSelector } from "reselect";

const selectWeatherData = (state) => {
  return state.weather;
};

export const selectFetchedWeatherData = createSelector([selectWeatherData], (weather) => {
    return weather.list;
  });