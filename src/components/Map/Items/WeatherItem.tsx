import React from 'react'

export interface WeatherItemProps {
    lat: number,
    lng: number,
    data: WeatherItem
}
 
const WeatherItem: React.SFC<WeatherItemProps> = ({ data }) => {
    return ( 
        <div>
            <img alt='weather icon' height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
        </div>
     );
}
 
export default WeatherItem;