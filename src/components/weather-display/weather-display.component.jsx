import React, { useEffect, useState } from 'react';
import displayStyles from "./weather-display.component.module.css"
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchedWeatherData } from '../../redux/weather.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWeatherDataAction } from '../../redux/weather.actions';

const WeatherDisplay = () => {
  let fetchedWeatherData=useSelector(selectFetchedWeatherData);
  const [weatherData, setWeatherData] = useState(null);
  const { temp, humidity, feels_like, } = weatherData?.main||"";
  const{description}=weatherData?.weather[0]||"";
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`;
  const nvaigate=useNavigate();
  const params=useParams();
  const dispatch=useDispatch();


  useEffect(()=>{ if(params)
     { 
      dispatch(fetchWeatherDataAction({location:params.location,type:"city"}));
    }
    },[params])





  
  useEffect(()=>{
    if(fetchedWeatherData.items?.main)
    {
      setWeatherData(fetchedWeatherData.items)

    }
    if(fetchedWeatherData.error)
    {
        // setError(fetchedWeatherData.error);
        setWeatherData([]);
    }
  },[fetchedWeatherData])

 

  

  return (
    <div className={ displayStyles.cardContainer}>
     {fetchedWeatherData.items &&
     <>
        <div className={displayStyles.appheader}>
            <button type="button" className={displayStyles.button} onClick={()=>{nvaigate("/")}}> &#x2190;</button>
                <h2 className={displayStyles.title}>Weather App</h2>
            </div>
        <div className={displayStyles.divider}></div>
        <div className={displayStyles.weatherIcon} style={{backgroundImage : `url(${iconUrl})`}}></div>
        <div className={displayStyles.temperature}>{temp}&#x2103;</div>
        <div className={displayStyles.description}>{description}</div>
        <div className={displayStyles.location}><PlaceOutlinedIcon/>{weatherData?.name}</div>
        <div className={displayStyles.appFooterSection}> 
            <div className={displayStyles.feelLike}><DeviceThermostatOutlinedIcon/>{humidity}&#x2103;<div>Feels Like</div></div>
            <div className={displayStyles.humidity}><OpacityOutlinedIcon/>{feels_like}%<div>Humidity</div></div>  
                   </div></>
}
    </div>
  );
};

export default WeatherDisplay;
