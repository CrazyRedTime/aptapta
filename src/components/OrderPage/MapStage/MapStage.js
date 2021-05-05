import { useDispatch, useSelector } from "react-redux";
import { fetchPoints, setCenter, setZoom } from "../../../redux/map/map";
import { setCurrentAddress, setCurrentCar, setCurrentCity } from "../../../redux/order/order";
import { getCurrentCityWithMemo } from "../../../redux/order/selectors";
import { getCenterWithMemo, getCitiesWithMemo, getMarkersWithMemo, getZoom } from "../../../redux/map/selectors";
import MapForm from "./MapForm/MapForm";
import OrderPageMap from "./OrderPageMap/OrderPageMap";
import { useEffect } from "react";
import Geocode from "react-geocode";
import apiKey from "../../../api/apiKey";

const MapStage = ({currentAddress }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("ru");
  }, []);

  useEffect(() => {
    dispatch(fetchPoints());
  }, [dispatch]);

  const markers = useSelector(getMarkersWithMemo);
  const citiesFromState = useSelector(getCitiesWithMemo)
  const center = useSelector(getCenterWithMemo);
  const zoom = useSelector(getZoom);
  const currentCity = useSelector(getCurrentCityWithMemo);

  const changeCenter = (newCenter) => {
    dispatch(setCenter(newCenter))
  }

  const changeZoom = (newZoom) => {
    dispatch(setZoom(newZoom))
  }

  const changeCurrentAddress = (newAddress) => {
    dispatch(setCurrentAddress(newAddress));
    dispatch(setCurrentCar(null));
  }

  const changeCurrentCity = (newCity) => {
    dispatch(setCurrentCity(newCity));
  }

  const filteredMarkers = currentCity
    ? markers.filter((marker) => marker.city.name === currentCity.name)
    : markers;

  return (
    <div>
      <MapForm
      citiesFromState={citiesFromState}
      filteredMarkers={filteredMarkers}
      currentCity={currentCity}
      currentAddress={currentAddress}
      setCenter={changeCenter}
      setCurrentCity={changeCurrentCity}
      setZoom={changeZoom}
      setCurrentAddress={changeCurrentAddress}
      />
      <OrderPageMap
        center={center}
        zoom={zoom}
        markers={markers}
        setZoom={changeZoom}
        setCenter={changeCenter}
        setCurrentCity={changeCurrentCity}
        setCurrentAddress={changeCurrentAddress}
      />
    </div>
  );
};

export default MapStage;
