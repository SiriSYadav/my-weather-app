const API_KEY = '9fdad3037ace458da966cf207ca5be8e';

export const getWeatherDataAPI = async ({location,type}) => {
    let response;
  try {
    if(type === "city")
    {
        response =  await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`
        );
    }
    else{
         response =  await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=imperial`
          );
    }

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    return data;

  } catch (err) {
    throw new Error('Error retrieving weather data',err);
  }
};
