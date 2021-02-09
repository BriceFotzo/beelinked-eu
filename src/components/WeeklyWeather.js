import React from 'react';
import DailyWeather from './DailyWeather'



function WeeklyWeather(props){
  
  const result = props.data

  result.shift()

  return(
    <ul className="WeeklyWeather">
     {result.map(day=>
    <DailyWeather data={day} key={day.dt}/>
  )} 
    </ul>
  )
}

export default WeeklyWeather;