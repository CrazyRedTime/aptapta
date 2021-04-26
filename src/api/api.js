import * as axios from 'axios';
import Geocode from "react-geocode";

const template = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api/',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*'
  }
})

const getPointsFromApi = async () => {
  const response = await template.get(`db/point`);
  return response.data.data.filter((marker) => marker.cityId);
}

const getMarkerForMap = async (point) => {
  const locationCoors = await Geocode.fromAddress(`${point.cityId.name} ${point.address}`);
  const { lat, lng } = locationCoors.results[0].geometry.location;
  const cityCoors = await Geocode.fromAddress(point.cityId.name);
  return { lat, lng, city: {
    name: point.cityId.name,
    lat: cityCoors.results[0].geometry.location.lat,
    lng: cityCoors.results[0].geometry.location.lng,
    id: point.cityId.id
  }, address: point.address, id: point.id };
}

const getCityForMap = async (city) => {
  console.log(city);
  // const response = await Geocode.fromAddress(city);
  // const { lat, lng } = response.results[0].geometry.location;
  // return { lat, lng, city };
}

const api = {
  getPointsFromApi,
  getMarkerForMap,
  getCityForMap,
}

export default api;