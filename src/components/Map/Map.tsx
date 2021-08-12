import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useStyles from './mapStyles';
import MapItem from './MapItem';

export interface MapProps {
    places: any
    coordinates: any,
    setCoordinates: React.Dispatch<React.SetStateAction<any>>,
    setBounds: React.Dispatch<React.SetStateAction<any>>
    setChildClicked: React.Dispatch<React.SetStateAction<null>>
}
 
const Map: React.SFC<MapProps> = ({ places, coordinates, setCoordinates, setBounds, setChildClicked }) => {

    const classes = useStyles();

    const handleChange = (e: any) => {
        const { center: { lat, lng }, marginBounds: { ne, sw } } = e;
        setCoordinates({ lat, lng });
        setBounds({ ne, sw });
    }

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBVcNQySsn4B9OBpsl5pOG6xEZAHp--nr8' }} 
                defaultCenter={coordinates} center={coordinates} defaultZoom={8}
                margin={[50, 50, 50, 50]} options={{}} onChange={handleChange} onChildClick={(child) => setChildClicked(child)}>
                {places.map((place: Place, index: number) => {
                    const coords= { lat: Number(place.latitude), lng: Number(place.longitude) }
                    return place.latitude ? <MapItem key={index} classes={classes} lat={coords.lat} lng={coords.lng} place={place}/> : null
                })}    
            </GoogleMapReact>
        </div>
     );
}
 
export default Map;