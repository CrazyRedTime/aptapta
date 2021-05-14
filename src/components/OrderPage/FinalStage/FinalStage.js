import { useSelector } from "react-redux";
import normalizeImageLink from "../../../helpers/normalizeImageLink";
import { getFromDate, getFullTank } from "../../../redux/details/selectors";
import {
  getCurrentCarName,
  getCurrentCarNumber,
  getCurrentCarImageLink,
} from "../../../redux/order/selectors";

import styles from "./FinalStage.module.scss";

const FinalStage = () => {
  const currentCarName = useSelector(getCurrentCarName);
  const currentCarNumber = useSelector(getCurrentCarNumber);
  const currentCarImageLink = useSelector(getCurrentCarImageLink);
  const dateFrom = useSelector(getFromDate);
  const fulltank = useSelector(getFullTank);

  const normalLink = normalizeImageLink(currentCarImageLink);

  return (
    <div className={styles.resultContainer}>
      <div className={styles.infoContainer}>
        <span className={styles.carName}>{currentCarName}</span>
        {currentCarNumber ? <span className={styles.carNumber}>{currentCarNumber}</span> : null}
        <div className={styles.optionContaner}>
          <span className={styles.title}>Топливо</span>
          {' '}
          <span className={styles.value}>{fulltank ? '100%' : 'минимум'}</span>
        </div>
        <div className={styles.optionContaner}>
          <span className={styles.title}>Доступна с </span>
          {' '}
          <span className={styles.value}>{dateFrom.toLocaleString(('en-GB', { timeZone: 'UTC' })).slice(0, 17)}</span>
        </div>
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

export default FinalStage;
