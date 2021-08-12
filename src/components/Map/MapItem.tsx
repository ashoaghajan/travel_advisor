import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import { useMediaQuery } from 'react-responsive';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import Rating from '@material-ui/lab/Rating';

export interface MapItemProps {
    classes: ClassNameMap<"paper" | "pointer" | "mapContainer" | "markerContainer">,
    place: Place,
    lat: number,
    lng: number
}
 
const MapItem: React.SFC<MapItemProps> = ({ classes, place }) => {

    const isDesktop = useMediaQuery({ minWidth: 800 });

    return ( 
        <div className={classes.markerContainer}>
            {isDesktop ? (
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant='subtitle2' gutterBottom>
                        {place.name}
                    </Typography>
                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url 
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/coordsaurant-Placeholder-001.jpg'
                    } alt={place.name}/>
                    <Rating size='small' value={Number(place.rating)} readOnly/>
                </Paper>
            ) : (
                <LocationOnOutlined  color='primary' fontSize='large' />
            )}
        </div>
     );
}
 
export default MapItem;
