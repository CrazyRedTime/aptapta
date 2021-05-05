import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiKey from "../../../../api/apiKey";
import { fetchMarkers } from "../../../../redux/map/map";
import { getPointsAddress } from "../../../../redux/map/selectors";
import Marker from "./Marker/Marker";
// import styles from "./OrderPageMap.module.scss";

const OrderPageMap = ({ center, markers, zoom, setZoom, setCenter, setCurrentCity, setCurrentAddress }) => {

  const dispatch = useDispatch();

  const points = useSelector(getPointsAddress);

  useEffect(() => {
    if (points.length) {
      dispatch(fetchMarkers(points));
    }
  }, [dispatch, points]);

  return (
    <div style={{ height: "368px", width: "736px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={center}
        zoom={zoom}
        options={{scrollwheel: true}}
      >
        {markers.map((marker, index) => {
          return (
            <Marker
              key={index}
              lat={marker.lat}
              lng={marker.lng}
              name={marker.address}
              color={"blue"}
              setCurrentCity={setCurrentCity}
              setCurrentAddress={setCurrentAddress}
              marker={marker}
              setZoom={setZoom}
              setCenter={setCenter}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default OrderPageMap;
