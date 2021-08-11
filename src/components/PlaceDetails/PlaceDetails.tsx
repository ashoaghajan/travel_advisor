import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import { LocationOn, Phone } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import useStyles from './placeDetailsStyles';

export interface PlaceDetailsProps {
    place: Place
}
 
const PlaceDetails: React.SFC<PlaceDetailsProps> = ({ place }) => {

    const classes = useStyles();
    console.log(place)

    return ( 
        <Card elevation={6}>
            <CardMedia style={{ height: 350 }} title={place.name} image={place.photo ? place.photo.images.large.url 
                : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
            }/>
            <CardContent>
                <Typography gutterBottom variant='h5'>{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Ranking</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                </Box>
                {place.awards?.map((award, index) => (
                    <Box key={index} my={1} display='flex' justifyContent='space-between'>
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                    </Box>
                ))}
                {place.cuisine?.map(({ key, name }) => (
                    <Chip key={key} size='small' label={name} className={classes.chip} />
                ))}
                {place.address && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                        <LocationOn /> {place.address}
                    </Typography>
                )}
                {place.phone && (
                    <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.spacing}>
                        <Phone /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size='small' color="primary" onClick={() => window.open(place.web_url, '_bank')}>
                        Trip Adviser
                    </Button>
                    <Button size='small' color="primary" onClick={() => window.open(place.website, '_bank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
     );
}
 
export default PlaceDetails;
