import { useEffect, useState } from "react";
import OpenedMenu from "../StartPage/OpenedMenu/OpenedMenu";
import StartPageMenu from "../StartPage/StartPageMenu/StartPageMenu";
import styles from "./OrderPage.module.scss";
import OrderPageHeader from "./OrderPageHeader/OrderPageHeader";
import OrderPageNav from "./OrderPageNav/OrderPageNav";
import OrderPageMap from "./OrderPageMap/OrderPageMap";
import { connect } from "react-redux";
import { fetchPoints } from "../../redux/map";
import Geocode from "react-geocode";
import { getCitiesWithMemo, getMarkersWithMemo } from "../../redux/selectors";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import apiKey from "../../api/apiKey";

const OrderPage = ({ fetchPoints, citiesFromState, markers }) => {
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

  const filterOptionsForCity = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
  });

  const filterOptionsForAddress = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.address,
  });

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
          <div className={styles.mapContainer}>
            <div className={styles.mapForm}>
              <Autocomplete
                id="city-select"
                classes={{
                  popupIndicator: styles.none,
                }}
                options={citiesFromState}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                getOptionSelected={(option, value) => option.id === value.id}
                filterOptions={filterOptionsForCity}
                renderInput={(params) => (
                  <TextField {...params} label="Город" variant="outlined" />
                )}
                onChange={(event, value, reason) => {
                  if (reason === "select-option") {
                    setCenter({ lat: value.lat, lng: value.lng });
                    setCurrentCity(value);
                    setZoom(12);
                    setCurrentAddress(null);
                  }
                  if (reason === "clear") {
                    setCurrentCity(null);
                    setCurrentAddress(null);
                  }
                }}
                value={currentCity}
              />
              <Autocomplete
                id="point-select"
                classes={{
                  popupIndicator: styles.none,
                }}
                options={filteredMarkers}
                getOptionLabel={(option) => option.address}
                filterOptions={filterOptionsForAddress}
                style={{ width: 300 }}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Пункт выдачи"
                    variant="outlined"
                  />
                )}
                onChange={(event, value, reason) => {
                  if (reason === "select-option") {
                    setCenter({ lat: value.lat, lng: value.lng });
                    setZoom(14);
                    if (currentCity === null) {
                      setCurrentCity(value.city);
                    }
                    setCurrentAddress(value);
                  }
                  if (reason === "clear") {
                    setCurrentAddress(null);
                  }
                }}
                value={currentAddress}
              />
            </div>
            <OrderPageMap center={center} zoom={zoom} />
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.yourOrderContainer}>
              <span className={styles.yourOrder}>Ваш заказ:</span>
            </div>
            {currentAddress ? (
              <div className={styles.orderPoint}>
                <span className={styles.pointTitle}>Пункт выдачи</span>
                <span className={styles.dots}>......................</span>
                <div className={styles.point}>
                  <span>{`${currentAddress.city.name},`}</span>
                  <span>{`${currentAddress.address}`}</span>
                </div>
              </div>
            ) : null}
            <button className={styles.chooseModelButton} disabled={!currentAddress}>
              Выбрать модель
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    citiesFromState: getCitiesWithMemo(state),
    markers: getMarkersWithMemo(state),
  };
};

export default connect(mapStateToProps, { fetchPoints })(OrderPage);
