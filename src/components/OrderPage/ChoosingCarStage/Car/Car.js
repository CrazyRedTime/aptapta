import { useSelector } from "react-redux";
import {
  getCurrentCarId,
} from "../../../../redux/order/selectors";
import styles from "./Car.module.scss";
import cn from "classnames";
import normalizeImageLink from "../../../../helpers/normalizeImageLink";
import { useState } from "react";

const Car = ({ car, chooseCar }) => {

  const normalLink = normalizeImageLink(car.thumbnail.path);

  const currentCar = useSelector(getCurrentCarId);

  const [hasError, setHasError] = useState(false);

  const classes = cn(styles.car, {
    [styles.active]: car.id === currentCar,
  });

  return (
    <div className={classes} onClick={() => chooseCar(car)}>
      <div className={styles.info}>
        <span className={styles.name}>{car.name}</span>
        <span className={styles.price}>
          {car.priceMin} - {car.priceMax} ₽
        </span>
      </div>
      <div className={styles.imageContainer}>
        <img onError={() => setHasError(true)}
          className={styles.carImage}
          src={hasError ? process.env.PUBLIC_URL + '/images/noPhoto.png' : normalLink}
          alt={car.name}
        ></img>
      </div>
    </div>
  );
};

export default Car;
