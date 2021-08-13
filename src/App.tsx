import { Fragment } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { useApp } from './hooks/useApp';

function App() {

  const { filteredPlaces, loading, weather,  childClicked, type, rating, coordinates,
    setBounds, setCoordinates, setChildClicked, setType, setRating } = useApp();
  
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
