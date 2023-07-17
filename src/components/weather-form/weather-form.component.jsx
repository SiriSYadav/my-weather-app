import React, { useEffect, useState } from 'react';
import WeatherDisplay from '../weather-display/weather-display.component'; 
import ErrorDisplay from '../error-display/error-display.component';
import { fetchWeatherDataAction,  } from '../../redux/weather.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchedWeatherData } from '../../redux/weather.selector'; 
import  weatherFormStyles from './weather-form.component.module.css';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const WeatherForm = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const dispatch=useDispatch();
  let fetchedWeatherData=useSelector(selectFetchedWeatherData);
  const [displayWeatherApp,setDisplayWeatherApp]=useState(false);
  const [weatherType,setWeatherType]=useState("");
  const navigate=useNavigate();
 

  useEffect(()=>{
    if(fetchedWeatherData.items?.main)
    {
      setDisplayWeatherApp(true);

    }
    if(fetchedWeatherData.error)
    {
        setError(fetchedWeatherData.error);
    }
  },[fetchedWeatherData])
 



  const handleSubmit = async (e) => {
    setLocation(e.target.value)
    e.preventDefault();
    navigate(`${location}`);
        
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
     {!displayWeatherApp&&
     (<div className={weatherFormStyles.cardContainer} >
        <h2 className={weatherFormStyles.title}>Weather App</h2>
        <div className={weatherFormStyles.divider}></div>
      <form onSubmit={handleSubmit} className={weatherFormStyles.form}>
        {/* <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={weatherFormStyles.input}
        /> */}
        <select placeholder='Select a City' value={location} onChange={handleSubmit}>
        <option>Select a City</option>
          <option value={"Bengaluru"}>Bengaluru</option>
          <option value={"Chennai"}>Chennai</option>
          <option value={"Delhi"}>Delhi</option>
          <option value={"Bombay"}>Bombay</option>
          <option value={"Mangalore"}>Mangalore</option>

        </select>
                {error && <ErrorDisplay message={error}/>}
                

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
)}
    </div>
  );
};

export default WeatherForm;
