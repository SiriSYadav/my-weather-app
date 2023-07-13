import React, { useEffect, useState } from 'react';
import WeatherDisplay from '../weather-display/weather-display.component'; 
import ErrorDisplay from '../error-display/error-display.component';
import { fetchWeatherDataAction,  } from '../../redux/weather.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchedWeatherData } from '../../redux/weather.selector'; 
import  weatherFormStyles from './weather-form.component.module.css';
import { CircularProgress } from '@mui/material';

const WeatherForm = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch=useDispatch();
  let fetchedWeatherData=useSelector(selectFetchedWeatherData);
  const [displayWeatherApp,setDisplayWeatherApp]=useState(false);
  const [weatherType,setWeatherType]=useState("");

  console.warn("payload",fetchedWeatherData)
 

  useEffect(()=>{
    if(fetchedWeatherData.items?.main)
    {
      setWeatherData(fetchedWeatherData.items)
      setDisplayWeatherApp(true);
    }
    if(fetchedWeatherData.error)
    {
        setError(fetchedWeatherData.error);
        setWeatherData([]);
    }
  },[fetchedWeatherData])


  const handleSubmit = async (e) => {
    e.preventDefault();
        setWeatherType("city");
      dispatch(fetchWeatherDataAction({location:location,type:"city"}))   
  };
  
  const handleCurrentLocationSelection = () => {
    setWeatherType("currentLocation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(fetchWeatherDataAction(
            {location:{latitude:position.coords.latitude,longitude:position.coords.longitude},
            type:"currentLocation"}
            ));

        },
        (error) => {
          setError(error.message)
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.')
    }

  };

  return (
    <div>
     {!displayWeatherApp?
     (<div className={weatherFormStyles.cardContainer} >
        <h2 className={weatherFormStyles.title}>Weather App</h2>
        <div className={weatherFormStyles.divider}></div>
      <form onSubmit={handleSubmit} className={weatherFormStyles.form}>
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={weatherFormStyles.input}
        />
                {error && <ErrorDisplay message={error}/>}
                {fetchedWeatherData.loading && weatherType==="city"?<CircularProgress className={weatherFormStyles.spinner}/>: 
                <button type="submit"className={weatherFormStyles.button}>Submit</button>}

      </form>
      <div className={weatherFormStyles.dividerContainer}>
      <div className={weatherFormStyles.divider}></div>
      &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;<div className={weatherFormStyles.divider}></div>
      </div>
      {fetchedWeatherData.loading && weatherType==="currentLocation" ?<CircularProgress className={weatherFormStyles.spinner}/>:
      <button type="button" 
      className={weatherFormStyles.button} 
      onClick={()=>{handleCurrentLocationSelection()}}>
        Get Device Location
        </button>
        }
      </div>
      ):weatherData && 
      <WeatherDisplay 
        data={weatherData} 
        enableWeatherForm={(flag)=>{
            setDisplayWeatherApp(flag);
            }} 
        />
        } 
    </div>
  );
};

export default WeatherForm;
