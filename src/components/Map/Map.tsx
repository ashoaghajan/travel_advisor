import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import Rating from '@material-ui/lab';
import useStyles from './mapStyles';
import { LocationOnOutlined } from '@material-ui/icons';

export interface MapProps {
    places: any
    coordinates: any,
    setCoordinates: React.Dispatch<React.SetStateAction<any>>,
    setBounds: React.Dispatch<React.SetStateAction<any>>

}
 
const Map: React.SFC<MapProps> = ({ places, coordinates, setCoordinates, setBounds }) => {

    const classes = useStyles();
    const isMobile = false;

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
                {places.map((place: Place, index: number) => {
                    const rest = {
                        lat: Number(place.latitude),
                        lng: Number(place.longitude)
                    }
                    return place.latitude ? (<div key={index} className={classes.markerContainer} {...rest}>
                            {isMobile ? (
                                <LocationOnOutlined  color='primary' fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url 
                                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                    } alt={place.name}/>

                                </Paper>
                            )}
                    </div>) : null
                })}    
            </GoogleMapReact>
        </div>
     );
}
 
export default Map;