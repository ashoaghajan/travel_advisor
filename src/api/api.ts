import axios from 'axios';

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async(sw: { lat: number, lng: number }, ne: { lat: number, lng: number }) => {
    try{
        const { data: { data } } = await axios.get(url, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-key': 'a2e6536511mshd35a80eaa6e6de6p1ece1ejsn349bc336e672',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }
    catch(err){
        console.log(err)
    }
}