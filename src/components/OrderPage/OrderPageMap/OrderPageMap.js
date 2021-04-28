import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import apiKey from "../../../api/apiKey";
import { fetchMarkers } from "../../../redux/map";
import { getPointsAddress } from "../../../redux/selectors";
import Marker from "./Marker/Marker";
// import styles from "./OrderPageMap.module.scss";

const OrderPageMap = ({ center, fetchMarkers, markers, zoom, setZoom, setCenter, setCurrentCity, setCurrentAddress }) => {

  const points = useSelector(getPointsAddress);

  useEffect(() => {
    if (points.length) {
      fetchMarkers(points);
    }
  }, [fetchMarkers, points]);

  return (
    <div style={{ height: "400px", width: "800px" }}>
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

export default connect(null, { fetchMarkers })(OrderPageMap);
