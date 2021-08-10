import React from 'react';

export interface PlaceDetailsProps {
    place: {
        name: string;
    }
}
 
const PlaceDetails: React.SFC<PlaceDetailsProps> = ({ place }) => {
    return ( 
        <div>{place.name}</div>
     );
}
 
export default PlaceDetails;
