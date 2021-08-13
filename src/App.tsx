import { Fragment, useEffect, useState, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData, getWeatherData } from './api/api';
import _ from 'lodash';

function App() {

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

  
  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces} childClicked={childClicked} loading={loading} type={type} rating={rating}
            setType={setType} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={filteredPlaces} weather={weather} coordinates={coordinates} setCoordinates={setCoordinates} 
            setBounds={setBounds} setChildClicked={setChildClicked}/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
