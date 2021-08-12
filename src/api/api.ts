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
              'x-rapidapi-key': '3ffddffc51mshfe90625f31cf035p1eed99jsn7343fe270769',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }
    catch(err){
        console.log(err)
    }
}