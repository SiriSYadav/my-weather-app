import React from 'react';
import displayStyles from "./weather-display.component.module.css"
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';

const WeatherDisplay = ({ data, enableWeatherForm=()=>{} }) => {
  const { temp, humidity, feels_like, } = data.main;
  const{description}=data.weather[0];
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  

  return (
    <div className={ displayStyles.cardContainer}>
        <div className={displayStyles.appheader}>
            <button type="button" className={displayStyles.button} onClick={()=>{enableWeatherForm(false)}}> &#x2190;</button>
                <h2 className={displayStyles.title}>Weather App</h2>
            </div>
        <div className={displayStyles.divider}></div>
        <div className={displayStyles.weatherIcon} style={{backgroundImage : `url(${iconUrl})`}}></div>
        <div className={displayStyles.temperature}>{temp}&#x2103;</div>
        <div className={displayStyles.description}>{description}</div>
        <div className={displayStyles.location}><PlaceOutlinedIcon/>{data.name}</div>
        <div className={displayStyles.appFooterSection}> 
            <div className={displayStyles.feelLike}><DeviceThermostatOutlinedIcon/>{humidity}&#x2103;<div>Feels Like</div></div>
            <div className={displayStyles.humidity}><OpacityOutlinedIcon/>{feels_like}%<div>Humidity</div></div>  
        </div>
      
    </div>
  );
};

export default WeatherDisplay;
