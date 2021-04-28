import { useEffect, useState } from "react";
import OpenedMenu from "../StartPage/OpenedMenu/OpenedMenu";
import StartPageMenu from "../StartPage/StartPageMenu/StartPageMenu";
import styles from "./OrderPage.module.scss";
import OrderPageHeader from "./OrderPageHeader/OrderPageHeader";
import OrderPageNav from "./OrderPageNav/OrderPageNav";
import OrderPageMap from "./OrderPageMap/OrderPageMap";
import { connect, useSelector } from "react-redux";
import { fetchPoints } from "../../redux/map";
import Geocode from "react-geocode";
import { getCitiesWithMemo, getMarkersWithMemo } from "../../redux/selectors";
import apiKey from "../../api/apiKey";
import MapForm from "./MapForm/MapForm";

const OrderPage = ({ fetchPoints }) => {

  const markers = useSelector(getMarkersWithMemo);
  const citiesFromState = useSelector(getCitiesWithMemo)

  useEffect(() => {
    Geocode.setApiKey(apiKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("ru");
  }, []);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  const [center, setCenter] = useState({ lat: 54.3186575, lng: 48.397776 });

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [currentCity, setCurrentCity] = useState(null);

  const [currentAddress, setCurrentAddress] = useState(null);

  const [zoom, setZoom] = useState(12);

  const filteredMarkers = currentCity
    ? markers.filter((marker) => marker.city.name === currentCity.name)
    : markers;

  return (
    <div className={styles.orderMain}>
      {menuIsOpen && <OpenedMenu />}
      <StartPageMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={styles.orderMainContainer}>
        <OrderPageHeader />
        <OrderPageNav />
        <div className={styles.orderWrap}>
          <div className={styles.rightContainer}>
            <MapForm
              citiesFromState={citiesFromState}
              filteredMarkers={filteredMarkers}
              currentCity={currentCity}
              currentAddress={currentAddress}
              setCenter={setCenter}
              setCurrentCity={setCurrentCity}
              setZoom={setZoom}
              setCurrentAddress={setCurrentAddress}
            />
            <OrderPageMap
              center={center}
              zoom={zoom}
              markers={markers}
              setZoom={setZoom}
              setCenter={setCenter}
              setCurrentCity={setCurrentCity}
              setCurrentAddress={setCurrentAddress}
            />
          </div>
          <div className={styles.leftContainer}>
            <div className={styles.yourOrderContainer}>
              <span className={styles.yourOrder}>Ваш заказ:</span>
            </div>
            {currentAddress ? (
              <div className={styles.orderPoint}>
                <span className={styles.pointTitle}>Пункт выдачи</span>
                <span className={styles.dots}></span>
                <div className={styles.point}>
                  <span>{`${currentAddress.city.name},`}</span>
                  <span>{`${currentAddress.address}`}</span>
                </div>
              </div>
            ) : null}
            <button
              className={styles.chooseModelButton}
              disabled={!currentAddress}
            >
              Выбрать модель
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { fetchPoints })(OrderPage);
