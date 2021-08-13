import React from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from './mapStyles';
import MapItem from './MapItem';
import WeatherItem from './WeatherItem';

export interface MapProps {
    places: any
    coordinates: any,
    weather: any,
    setCoordinates: React.Dispatch<React.SetStateAction<any>>,
    setBounds: React.Dispatch<React.SetStateAction<any>>
    setChildClicked: React.Dispatch<React.SetStateAction<null>>
}
 
const Map: React.SFC<MapProps> = ({ places, coordinates, weather, setCoordinates, setBounds, setChildClicked }) => {

    const classes = useStyles();

    const handleChange = (e: any) => {
        const { center: { lat, lng }, marginBounds: { ne, sw } } = e;
        setCoordinates({ lat, lng });
        setBounds({ ne, sw });
    }

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBVcNQySsn4B9OBpsl5pOG6xEZAHp--nr8' }} 
                defaultCenter={coordinates} center={coordinates} defaultZoom={14}
                margin={[50, 50, 50, 50]} options={{}} onChange={handleChange} onChildClick={(child) => setChildClicked(child)}>
                {places?.map((place: Place, index: number) => {
                    const coords= { lat: Number(place.latitude), lng: Number(place.longitude) }
                    return place.latitude ? <MapItem key={index} classes={classes} lat={coords.lat} lng={coords.lng} place={place}/> : null
                })} 
                {weather?.list?.map((data: WeatherItem, index: number) => (
                    <WeatherItem key={index} data={data} lat={data.coord?.lat} lng={data.coord?.lon}/>
                ))}   
            </GoogleMapReact>
        </div>
     );
}
 
export default Map;