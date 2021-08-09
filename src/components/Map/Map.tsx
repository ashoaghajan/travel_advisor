import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './mapStyles';

export interface MapProps {
    
}
 
const Map: React.SFC<MapProps> = () => {

    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const coordinates = { lat: 0, lng: 0 };

    const handleChange = () => {

    }

    const handleChildClick = () => {

    }

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBVcNQySsn4B9OBpsl5pOG6xEZAHp--nr8' }} 
                defaultCenter={coordinates} center={coordinates} defaultZoom={14}
                margin={[50, 50, 50, 50]} options={{}} onChange={handleChange} onChildClick={handleChildClick}>

            </GoogleMapReact>
        </div>
     );
}
 
export default Map;