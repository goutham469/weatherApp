import { useState } from 'react';
import './App.css';
import degreeCelcius from './assets/degreeCelcius.png'
import { IoRainyOutline } from "react-icons/io5";

import rain from './assets/weatherIcons/rain.jpg'
import PageIcon from './assets/PageIcon.png'
import humidityIcon from './assets/humidityIcon.png'

function App() {
  let [city,updateCityName] = useState('khammam')
  let [weatherData,updateWeatherData] = useState({})
  let [LongTermForecast,setLognTermForecast] = useState(false)
  

  async function getWeatherData()
  {
    let weather_app_url = process.env.REACT_APP_WEATHER_APP_URL
    let weather_app_api_key = process.env.REACT_APP_WEATHER_APP_API_KEY

    console.log(`${weather_app_url}/${city}?key=${weather_app_api_key}`)


    let responseFromServer = await fetch(`${weather_app_url}/${city}?key=${weather_app_api_key}`)
    
    responseFromServer = await responseFromServer.json();
    updateWeatherData(responseFromServer)
    console.log(weatherData)
    
  }

  const styleSheet = {
    "mainApp":{
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      //color: "#909b74"
      color:"black"
    },
    "parentComponent":{
    },
    "cityInput":{
      padding:"5px",
      fontSize:"26px",
      width:"250px",
      borderRadius:"10px"
    },
    "getWeatherButton":{
      backgroundColor:"#acbd7f",
      margin:"10px",
      padding:"3px",
      borderRadius:"10px",
      border:"0px solid white",
      width:"80px",
      height:"30px"
    },
    "weatherData":{
      // backgroundColor:"#95abaf",
      borderRadius:"20px",
      padding:"10px",
      color:"#ffd503"
    },
    "ForeCastImage":{
      width:"30px",
      height:"30px"
    },
    "LongTimeWeather15Button":{padding:"5px",margin:"10px",color:"green",backgroundColor:"white",borderRadius:"10px"}
  }

  function GetCelcius(value)
  {
    return String((Number(value) - 32)*5/9).substring(0,4);
  }

  return (
    <div className='App' style={styleSheet.mainApp}>
      
      <div style={styleSheet.parentComponent}>
        <label style={{color:"gold",fontSize:"30px"}}> <img width="40px" style={{marginRight:"10px"}} src={PageIcon}/><b>Sun Shower </b></label>
        <p style={{color:"gold",fontSize:"20px"}}> -Weather App</p>
        <p style={{color:"gold"}}>enter your city to get weather details</p>
        <input style={styleSheet.cityInput} type='input' placeholder='city ex:-Khammam' onChange={(event)=>{updateCityName(event.target.value)}}/>
        <br/>
        <button style={styleSheet.getWeatherButton} onClick={()=>{getWeatherData()}}>get Data</button>
        <div className='weatherData' style={styleSheet.weatherData}>
          {
            weatherData.latitude ?
            <div>
              <label style={{fontSize:"40px"}}>
               
                {String((Number(weatherData.currentConditions.temp) - 32)*5/9).substring(0,4)}&deg;C 
              </label>
              <label style={{marginLeft:"20px",color:"black",fontSize:"22px",fontWeight:"600"}}>@ {weatherData.currentConditions.conditions}</label>
              {/* <img src={degreeCelcius} style={{width:"100px"}}/> */}
              <p style={{color:"black",fontWeight:"500"}}>Address : {weatherData.resolvedAddress}</p>
              
              <p style={{color:"black",fontWeight:"500"}}>feels like : {String((Number(weatherData.currentConditions.temp) - 32)*5/9).substring(0,4)}&deg;C</p>

              <label style={{color:"black",fontWeight:"500"}} >humidity </label><label style={{color:"black"}}>{weatherData.currentConditions.humidity}%</label>
              <label style={{color:"black",fontWeight:"500",marginLeft:"7px"}} >, Air pressure  </label><label style={{color:"black"}}>{weatherData.currentConditions.pressure} hPa</label>

              <p style={{color:"black",fontWeight:"500"}}>today's weather forecast</p>
              <div className='todayForecast'>
                {
                  weatherData.days[0].hours.map(x=>{
                    return <div style={{width:"50px",margin:"4px"}}>
                      <label style={{margin:"5px"}}>{x.datetime.substring(0,5)}</label><br/>
                      {
                        x.icon == 'rain' ?<img style={styleSheet.ForeCastImage} src={rain}/>:
                        x.icon == 'partly-cloudy-night' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/partly-cloudy-night.svg'/>:
                        x.icon == 'thunder-rain' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/thunder-rain.svg'/>:
                        x.icon == 'clear-night' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/clear-night.svg'/>:
                        x.icon == 'partly-cloudy-day' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/partly-cloudy-day.svg'/>:
                        x.icon == 'cloudy' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/cloudy.svg'/>:
                        x.icon == 'clear-day' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/clear-day.svg'/>:
                        x.icon == 'fog' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/fog.svg'/>:
                        x.icon == 'hail' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/hail.svg'/>:
                        x.icon == '' ?<img style={styleSheet.ForeCastImage}/>:
                        <label>other icon = {x.icon}</label>
                      }
                      <br/>
                      <label>{String((Number(x.temp) - 32)*5/9).substring(0,4)} C</label>
                    </div>
                  })
                }
              </div>

              {/* <p>latitude : {weatherData.latitude}</p>
              <p>longitude : {weatherData.longitude}</p>
              <p>Address : {weatherData.resolvedAddress}</p>
              <p>cloud cover : {weatherData.currentConditions.cloudcover}</p>
              <p>visibility : {weatherData.currentConditions.visibility}</p> */}
              {
                LongTermForecast == false ?
                <button style={styleSheet.LongTimeWeather15Button} onClick={()=>{setLognTermForecast(true)}}>15 Days weather forecast</button>
                :
                <button onClick={()=>{setLognTermForecast(false)}}>Hide Long term forecast</button>
              }
              {
                LongTermForecast == true ?
                <div className='LongTermWeatherForecast'>
                {
                  weatherData.days.map(day=>{
                    return <div className='DayComponent'>
                      <center><label style={{fontSize:"20px",color:"white"}}>{day.datetime}</label><br/></center>
                      <label style={{fontSize:"40px"}}>{day.temp}&deg;C</label>
                      <br/>
                      <label>max : <b>{GetCelcius(day.tempmax)}&deg;C</b></label>
                      <label style={{marginLeft:"20px"}}> min : <b>{GetCelcius(day.tempmin)}&deg;C</b></label>
                      <br/>
                      <label>dew : {day.dew}</label>
                      <label> , humidity : {day.humidity}</label>
                      <label> , precipitation : {day.precip}</label>
                      <p>wind speed : {day.windspeed}km/h</p>
                      <p>pressure : {day.pressure} hPa</p>
                      <p>cloudcover : {day.cloudcover}</p>
                      <p>visibility : {day.visibility}</p>
                      <p>solar radiation : {day.solarradiation}</p>
                      <p>solar energy : {day.solarenergy}</p>
                      <p>uv-index : {day.uvindex}</p>
                      <label>sunrise :- <b>{day.sunrise}</b></label>
                      <label style={{marginLeft:"20px"}}>sunset :- <b>{day.sunset}</b></label>
                      <br/>
                      <p>conditions : {day.conditions}</p>
                      <p>{day.description}</p>
                      <h5>Hourly forecast</h5>
                      <div className='todayForecast2'>
                      {
                        day.hours.map(x=>{
                          return <div style={{width:"200px",margin:"4px"}}>
                            <label style={{margin:"5px"}}>{x.datetime.substring(0,5)}</label><br/>
                            {
                              x.icon == 'rain' ?<img style={styleSheet.ForeCastImage} src={rain}/>:
                              x.icon == 'partly-cloudy-night' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/partly-cloudy-night.svg'/>:
                              x.icon == 'thunder-rain' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/thunder-rain.svg'/>:
                              x.icon == 'clear-night' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/clear-night.svg'/>:
                              x.icon == 'partly-cloudy-day' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/partly-cloudy-day.svg'/>:
                              x.icon == 'cloudy' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/cloudy.svg'/>:
                              x.icon == 'clear-day' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/clear-day.svg'/>:
                              x.icon == 'fog' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/fog.svg'/>:
                              x.icon == 'hail' ?<img style={styleSheet.ForeCastImage} src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/1st%20Set%20-%20Color/hail.svg'/>:
                              x.icon == '' ?<img style={styleSheet.ForeCastImage}/>:
                              <label>other icon = {x.icon}</label>
                            }
                            <br/>
                            <label>{String((Number(x.temp) - 32)*5/9).substring(0,4)} C</label>
                            <label><img src={humidityIcon} width="20px"/>:{String(x.humidity).substring(0,4)}</label>
                            {/* <p>dew {x.dew}</p> */}
                            <p>precip : {x.precip}</p>
                            <p>wind speed : {x.windspeed}</p>
                            {/* <p>pressure : {x.pressure}</p> */}
                          </div>
                        })
                      }
                      </div>




                    </div>
                  })
                }
              </div>
              :
              <div></div>
              }
            </div>
            :
            <div>
              <h4>enter city name</h4>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
  
export default App;

