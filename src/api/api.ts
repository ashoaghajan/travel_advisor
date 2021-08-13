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
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const getWeatherData = async(lat: number, lng: number) => {
  try{
    const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
      params: {
        lon: lng,
        lat
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    });
    return data;
  }
  catch(err){
    console.log(err);
  }
}