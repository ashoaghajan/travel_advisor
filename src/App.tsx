import { Fragment, useEffect, useState, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api/api';
import _ from 'lodash';

function App() {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0  } });
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  },[]);

  const getPlaces = useRef(_.debounce(async(sw: any, ne: any) => {
    const data = await getPlacesData(sw, ne);
    setPlaces(data);
    setLoading(false);
  }, 1000)).current;

  useEffect(() => {
    setLoading(true);
    getPlaces(bounds.sw, bounds.ne);
  },[coordinates, bounds]);

  
  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} childClicked={childClicked} loading={loading}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={places} coordinates={coordinates} setCoordinates={setCoordinates} 
            setBounds={setBounds} setChildClicked={setChildClicked}/>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
