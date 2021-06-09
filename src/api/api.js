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

const getCarsFromApi = async () => {
  const response = await template.get(`db/car`);
  return response.data.data.filter((car) => car.categoryId);
}

const getRatesFromApi = async () => {
  const response = await template.get(`db/rate`);
  return response.data.data;
};

const getOrderStatusIdFromApi = async () => {
  const response = await template.get(`/db/orderStatus`);
  return response.data.data[0];
};

const postOrderToApi = async (order) => {
  const response = await template.post(`/db/order`, order);
  return response.data.data;
};

const getOrderFromApi = async (orderId) => {
  const response = await template.get(`/db/order/${orderId}`);
  return response.data.data;
};

const api = {
  getPointsFromApi,
  getMarkerForMap,
  getCarsFromApi,
  getRatesFromApi,
  getOrderStatusIdFromApi,
  postOrderToApi,
  getOrderFromApi
}

export default api;