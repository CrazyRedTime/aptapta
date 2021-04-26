import styles from "./Marker.module.scss";
import cn from "classnames";

const Marker = ({ color, name, setCurrentCity, setCurrentAddress, marker }) => {

  const hadleMarker = () => {
    setCurrentCity(marker.city);
    setCurrentAddress(marker);
  }

  return (
    <div>
      <div
        onClick={hadleMarker}
        className={cn(styles.pin, styles.bounce)}
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
      <div className={styles.pulse} />
    </div>
  );
};

export default Marker;
