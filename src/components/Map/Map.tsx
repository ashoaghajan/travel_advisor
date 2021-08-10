import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './mapStyles';

export interface MapProps {
    coordinates: any,
    setCoordinates: React.Dispatch<React.SetStateAction<any>>,
    setBounds: React.Dispatch<React.SetStateAction<any>>

}
 
const Map: React.SFC<MapProps> = ({ coordinates, setCoordinates, setBounds }) => {

    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    const handleChange = (e: any) => {
        const { center: { lat, lng }, marginBounds: { ne, sw } } = e;
        setCoordinates({ lat, lng });
        setBounds({ ne, sw });
    }

    const handleChildClick = () => {

    }

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBVcNQySsn4B9OBpsl5pOG6xEZAHp--nr8' }} 
                defaultCenter={coordinates} center={coordinates} defaultZoom={8}
                margin={[50, 50, 50, 50]} options={{}} onChange={handleChange} onChildClick={handleChildClick}>

            </GoogleMapReact>
        </div>
     );
}
 
export default Map;