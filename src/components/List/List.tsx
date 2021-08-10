import React, { useState } from 'react';
import { CircularProgress, Grid, Typography, MenuItem, FormControl, Select, InputLabel } from '@material-ui/core';
import useStyles from './listStyles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

export interface ListProps {
    places: any[]
}

const types = ['restaurants', 'hotels', 'attractions'];

const ratings = [
    { label: 'All', value: 0 }, 
    { label: 'Above 3.0', value: 3 }, 
    { label: 'Above 4.0', value: 4 }, 
    { label: 'Above 4.5', value: 4.5 }
];

 
const List: React.SFC<ListProps> = ({ places }) => {

    const classes = useStyles();
    const [type, setType] = useState(types[0]);
    const [rating, setRating] = useState(0);


    return ( 
        <div className={classes.container}>
            <Typography variant='h4'>
                Restaurants, Hotels & Attractions around you
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e:any) => setType(e.target.value)}>
                    {types.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e:any) => setRating(e.target.value)}>
                    {ratings.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, index) => (
                    <Grid item key={index} xs={12}>
                        <PlaceDetails place={place}/>
                    </Grid>
                ))}
            </Grid>
        </div>
     );
}
 
export default List;
