import { useEffect, useState, useRef } from 'react';
import { getPlacesData, getWeatherData } from '../api/api';
import _ from 'lodash';

export const useApp = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather]: [any, React.Dispatch<React.SetStateAction<any>>] = useState(null);
  
    const [coordinates, setCoordinates]: [any, React.Dispatch<React.SetStateAction<any>>] = useState(null);
    const [bounds, setBounds] = useState({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0  } });
    const [childClicked, setChildClicked]: [any, React.Dispatch<React.SetStateAction<any>>] = useState({});
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
  
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      })
    },[]);
  
    useEffect(() => {
      places.length && setFilteredPlaces(places.filter((place: Place) => place.rating > rating));
      // eslint-disable-next-line
    },[rating]);
  
    useEffect(() => {
      if(bounds.sw && coordinates){
        setLoading(true);
        getData(type, bounds.sw, bounds.ne, coordinates);
      }
      // eslint-disable-next-line
    },[bounds.sw, type]);
  
  
    const getData = useRef(_.debounce(async(type, sw: any, ne: any, coords: any) => {
      // get weather
        const weatherData = await getWeatherData(coords.lat, coords.lng);
        setWeather(weatherData);
      // get places
      const data = await getPlacesData(type, sw, ne);
      const filteredData = data?.filter((place: Place) => place.name && Number(place.num_reviews) > 0);
      data.length && setPlaces(filteredData);
      data.length && setFilteredPlaces(filteredData);
      setLoading(false);
    }, 1000)).current;

    return { filteredPlaces, loading, weather,  childClicked, type, rating, coordinates, 
        setBounds, setCoordinates, setChildClicked, setType, setRating }
}