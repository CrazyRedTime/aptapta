import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { connect } from "react-redux";
import apiKey from "../../../api/apiKey";
import { fetchMarkers } from "../../../redux/map";
import { getMarkersWithMemo, getPointsAddress } from "../../../redux/selectors";
import Marker from "./Marker/Marker";
// import styles from "./OrderPageMap.module.scss";

const OrderPageMap = ({ center, points, fetchMarkers, markers, zoom, setCurrentCity, setCurrentAddress }) => {

  useEffect(() => {
    if (points.length) {
      fetchMarkers(points);
    }
  }, [fetchMarkers, points]);

  useEffect(() => {
    console.log(markers);
  }, [markers])

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
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    points: getPointsAddress(state),
    markers: getMarkersWithMemo(state),
  };
};

export default connect(mapStateToProps, { fetchMarkers })(OrderPageMap);
