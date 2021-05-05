import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import styles from "./MapForm.module.scss";

const MapForm = ({
  citiesFromState,
  filteredMarkers,
  currentCity,
  currentAddress,
  setCenter,
  setCurrentCity,
  setZoom,
  setCurrentAddress,
}) => {
  const filterOptionsForCity = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.name,
  });

  const filterOptionsForAddress = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.address,
    startAfter: 2,
  });

  return (
    <div className={styles.mapForm}>
      <Autocomplete
        id="city-select"
        forcePopupIcon={false}
        options={citiesFromState}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        getOptionSelected={(option, value) => option.id === value.id}
        filterOptions={filterOptionsForCity}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Город"
            placeholder="Начните вводить город..."
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        noOptionsText="Ничего не найдено"
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
            setZoom(12);
          }
        }}
        value={currentCity}
      />
      <Autocomplete
        id="point-select"
        forcePopupIcon={false}
        options={filteredMarkers}
        getOptionLabel={(option) => option.address}
        filterOptions={filterOptionsForAddress}
        style={{ width: 300 }}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Пункт выдачи"
            placeholder="Начните вводить пункт..."
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        noOptionsText="Ничего не найдено"
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
            setZoom(12);
          }
        }}
        value={currentAddress}
      />
    </div>
  );
};

export default MapForm;
