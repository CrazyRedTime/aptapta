import { useSelector } from "react-redux";
import normalizeImageLink from "../../../helpers/normalizeImageLink";
import { getFromDate, getFullTank } from "../../../redux/details/selectors";
import {
  getCurrentCarName,
  getCurrentCarNumber,
  getCurrentCarImageLink,
} from "../../../redux/order/selectors";
import { getPlacedOrderWithMemo, getOrderIsFetching } from "../../../redux/placedOrder/selectors";
import Preloader from "../../Preloader/Preloader";

import styles from "./FinalStage.module.scss";

const FinalStage = () => {
  const currentCarName = useSelector(getCurrentCarName);
  const currentCarNumber = useSelector(getCurrentCarNumber);
  const currentCarImageLink = useSelector(getCurrentCarImageLink);
  const dateFromState = useSelector(getFromDate);
  const fulltank = useSelector(getFullTank);

  const { carId, dateFrom, isFullTank } = useSelector(getPlacedOrderWithMemo);

  const orderIsFetching = useSelector(getOrderIsFetching)

  const normalLink = carId
    ? normalizeImageLink(carId.thumbnail.path)
    : currentCarImageLink
    ? normalizeImageLink(currentCarImageLink)
    : null;

  return (
    <div className={styles.resultContainer}>
      {orderIsFetching && <Preloader />}
      <div className={styles.infoContainer}>
        {carId ? (
          <span className={styles.confirm}>Ваш заказ подтверждён</span>
        ) : null}
        {carId || currentCarName ? (
          <span className={styles.carName}>
            {carId ? carId.name : currentCarName}
          </span>
        ) : null}
        {carId || currentCarNumber ? (
          carId && carId.number ? (
            <span className={styles.carNumber}>{carId.number}</span>
          ) : currentCarNumber ? (
            <span className={styles.carNumber}>{currentCarNumber}</span>
          ) : null
        ) : null}
        {carId || currentCarName ? (
          <div className={styles.optionContaner}>
            <span className={styles.title}>Топливо</span>{" "}
            <span className={styles.value}>
              {fulltank || isFullTank ? "100%" : "минимум"}
            </span>
          </div>
        ) : null}
        {dateFrom || dateFromState ? (
          <div className={styles.optionContaner}>
            <span className={styles.title}>Доступна с </span>{" "}
            <span className={styles.value}>
              {dateFrom
                ? new Date(dateFrom)
                    .toLocaleString(("en-GB", { timeZone: "UTC" }))
                    .slice(0, 17)
                : dateFromState
                    .toLocaleString(("en-GB", { timeZone: "UTC" }))
                    .slice(0, 17)}
            </span>
          </div>
        ) : null}
      </div>
      {normalLink && (
        <div className={styles.imageContainer}>
          <div
            className={styles.carImage}
            style={{
              backgroundImage: `url(${normalLink})`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default FinalStage;
