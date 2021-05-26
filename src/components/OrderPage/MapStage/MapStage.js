import { useDispatch, useSelector } from "react-redux";
import { fetchPoints, setCenter, setZoom } from "../../../redux/map/actions";
import {
  setCurrentAddress,
  setCurrentCar,
  setCurrentCity,
  uncompleteAdditionalStage,
} from "../../../redux/order/actions";
import {
  getAdditionalStageISCompleted,
  getCarStageIsCompleted,
  getCurrentAddressWithMemo,
  getCurrentCityWithMemo,
  getMapStageIsCompleted,
} from "../../../redux/order/selectors";
import {
  getCenterWithMemo,
  getCitiesWithMemo,
  getMapIsFetching,
  getMarkersWithMemo,
  getPointsAddress,
  getZoom,
} from "../../../redux/map/selectors";
import MapForm from "./MapForm/MapForm";
import OrderPageMap from "./OrderPageMap/OrderPageMap";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Geocode from "react-geocode";
import apiKey from "../../../api/apiKey";
import { clearDetails } from "../../../redux/details/actions";
import Preloader from "../../Preloader/Preloader";
import styles from './MapStage.module.scss'

const MapStage = () => {
  const dispatch = useDispatch();

  let history = useHistory();

  const currentAddress = useSelector(getCurrentAddressWithMemo);
  const markers = useSelector(getMarkersWithMemo);
  const citiesFromState = useSelector(getCitiesWithMemo);
  const center = useSelector(getCenterWithMemo);
  const zoom = useSelector(getZoom);
  const currentCity = useSelector(getCurrentCityWithMemo);
  const mapStageIsCompleted = useSelector(getMapStageIsCompleted);
  const carStageIsCompleted = useSelector(getCarStageIsCompleted);
  const additionalStageIsCompleted = useSelector(getAdditionalStageISCompleted);
  const points = useSelector(getPointsAddress);
  const mapIsFetching = useSelector(getMapIsFetching);

  useEffect(() => {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("ru");
  }, []);

  useEffect(() => {
    if (!points.length && !history.location.search) {
      dispatch(fetchPoints());
    }
  }, [dispatch, points, history.location.search]);

  const changeCenter = (newCenter) => {
    dispatch(setCenter(newCenter));
  };

  const changeZoom = (newZoom) => {
    dispatch(setZoom(newZoom));
  };

  const changeCurrentAddress = (newAddress) => {
    dispatch(setCurrentAddress(newAddress));
    if (mapStageIsCompleted) {
      dispatch(setCurrentCar(null));
    }
    if (carStageIsCompleted) {
      dispatch(clearDetails());
    }
    if (additionalStageIsCompleted) {
      dispatch(uncompleteAdditionalStage());
    }
  };

  const changeCurrentCity = (newCity) => {
    dispatch(setCurrentCity(newCity));
  };

  const filteredMarkers = currentCity
    ? markers.filter((marker) => marker.city.name === currentCity.name)
    : markers;

  return (
    <div>
      {mapIsFetching ? <Preloader /> : null} 
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
      <div className={styles.mapTitleContainer}><span className={styles.mapTitle}>Выбрать на карте:</span></div>
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
