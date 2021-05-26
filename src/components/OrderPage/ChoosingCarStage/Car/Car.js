import { useDispatch, useSelector } from "react-redux";
import { setCurrentCar } from "../../../../redux/order/actions";
import {
  getCarStageIsCompleted,
  getCurrentCarId,
} from "../../../../redux/order/selectors";
import styles from "./Car.module.scss";
import cn from "classnames";
import { clearDetails } from "../../../../redux/details/actions";
import normalizeImageLink from "../../../../helpers/normalizeImageLink";

const Car = ({ car }) => {

  const normalLink = normalizeImageLink(car.thumbnail.path);

  const carStageIsCompleted = useSelector(getCarStageIsCompleted);

  const dispatch = useDispatch();

  const chooseCar = (car) => {
    dispatch(setCurrentCar(car));
    if (carStageIsCompleted) {
      dispatch(clearDetails());
    }
  };

  const currentCar = useSelector(getCurrentCarId);

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
        <div
          className={styles.carImage}
          style={{
            backgroundImage: `url(${normalLink})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Car;
