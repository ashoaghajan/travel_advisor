import axios from 'axios';

export const getPlacesData = async(type: string ,sw: { lat: number, lng: number }, ne: { lat: number, lng: number }) => {
    try{
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-key': '5d497c5ce8msh5edc7c71145b665p1304fdjsnfd753ab2d4d3',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }
    catch(err){
        console.log(err)
    }
}