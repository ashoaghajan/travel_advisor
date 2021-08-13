import { Fragment, useEffect, useState, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api/api';
import _ from 'lodash';

function App() {

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates]: [any, React.Dispatch<React.SetStateAction<any>>] = useState(null);
  const [bounds, setBounds] = useState({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0  } });
  const [childClicked, setChildClicked]: [any, React.Dispatch<React.SetStateAction<any>>] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  },[]);

  useEffect(() => {
    places.length && setFilteredPlaces(places.filter((place: Place) => place.rating > rating));
  },[rating]);

  const getPlaces = useRef(_.debounce(async(type, sw: any, ne: any) => {
    const data = await getPlacesData(type, sw, ne);
    data.length && setPlaces(data);
    data.length && setFilteredPlaces(data);
    setLoading(false);
  }, 1000)).current;

  useEffect(() => {
    setLoading(true);
    getPlaces(type, bounds.sw, bounds.ne);
  },[coordinates, bounds.sw, type]);

  
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces} childClicked={childClicked} loading={loading} type={type} rating={rating}
            setType={setType} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={filteredPlaces} coordinates={coordinates} setCoordinates={setCoordinates} 
            setBounds={setBounds} setChildClicked={setChildClicked}/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
