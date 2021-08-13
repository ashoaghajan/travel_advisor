import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, MenuItem, FormControl, Select, InputLabel } from '@material-ui/core';
import useStyles from './listStyles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const types = ['restaurants', 'hotels', 'attractions'];

const ratings = [
    { label: 'All', value: 0 }, 
    { label: 'Above 3.0', value: 3 }, 
    { label: 'Above 4.0', value: 4 }, 
    { label: 'Above 4.5', value: 4.5 }
];

export interface ListProps {
    places: any[],
    childClicked: any,
    loading: boolean,
    type: string,
    rating: number,
    setType: React.Dispatch<React.SetStateAction<string>>,
    setRating: React.Dispatch<React.SetStateAction<number>>
}
 
const List: React.SFC<ListProps> = ({ places, childClicked, loading, type, rating, setType, setRating }) => {

    const classes = useStyles();
    const [elRefs, setElRefs]: [any[], React.Dispatch<React.SetStateAction<any>>] = useState([]);
    
    useEffect(() => {
        const refs: any[] = Array(places?.length).fill(null).map((_, index) => elRefs[index] || createRef());
        setElRefs(refs);
        // eslint-disable-next-line
    },[places]);


    return ( 
        <div className={classes.container}>
            <Typography variant='h4'>Restaurants, Hotels & Attractions around you</Typography>
            {loading ? (
                <div className={classes.loading}>
                    <CircularProgress size='5rem'/>
                </div>
            ) : (
                <>
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
                        <Grid ref={elRefs[index]} item key={index} xs={12}>
                            <PlaceDetails place={place} refProp={elRefs[index]} selected={Number(childClicked) === index}/>
                        </Grid>
                    ))}
                </Grid>
                </>
            )}
        </div>
     );
}
 
export default List;
