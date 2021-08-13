type Place = {
    name: string,
    photo: any,
    price_level: string,
    ranking: string,
    rating: number,
    awards: any[],
    cuisine: { key: string, name: string }[],
    address: string,
    phone: string,
    web_url: string,
    website: string,
    latitude: string,
    longitude: string,
    num_reviews: string
}

type WeatherItem = {
    coord: { lat: number, lon: number },
    weather: any
}
