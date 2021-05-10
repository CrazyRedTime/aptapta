import { useDispatch, useSelector } from "react-redux";
import {
  getBabySeat,
  getCurrentColor,
  getCurrentRate,
  getFromDate,
  getFullTank,
  getRigthHandDrive,
  getToDate,
} from "../../../redux/details/selectors";
import {
  completeAdditionalStage,
  completeCarStage,
  completeMapStage,
} from "../../../redux/order/order";
import {
  getCurrentAddressWithMemo,
  getCurrentCarName,
} from "../../../redux/order/selectors";
import styles from "./OrderStatus.module.scss";

const OrderStatus = ({ currentStage, setCurrentStage }) => {
  const currentAddress = useSelector(getCurrentAddressWithMemo);

  const currentCarName = useSelector(getCurrentCarName);
  const currentColor = useSelector(getCurrentColor);
  const from = useSelector(getFromDate);
  const to = useSelector(getToDate);
  const currentRate = useSelector(getCurrentRate);
  const fulltank = useSelector(getFullTank);
  const babySeat = useSelector(getBabySeat);
  const rightHandDrive = useSelector(getRigthHandDrive);

  const dispatch = useDispatch();

  const datesDifference = () => {
    if (to && from && to > from) {
      const diff = to - from;
      const min = 60000;
      const hour = min * 60;
      const day = hour * 24;
      const days = Math.floor(diff / day);
      // diff -= days * day;
      const hours = Math.floor((diff - days * day) / hour);
      // diff -= hours * hour;
      const minutes = Math.floor((diff - (days * day + hours * hour)) / min);
      return `${days >= 1 ? `${days}д` : ""}${hours >= 1 ? `${hours}ч` : ""}${
        minutes >= 1 ? `${minutes}мин` : ""
      }`;
    }
    return null;
  };

  const renderButton = () => {
    if (currentStage === 1) {
      return (
        <button
          className={styles.chooseModelButton}
          disabled={!currentAddress}
          onClick={() => {
            setCurrentStage(2);
            dispatch(completeMapStage());
          }}
        >
          Выбрать модель
        </button>
      );
    } else if (currentStage === 2) {
      return (
        <button
          className={styles.chooseModelButton}
          disabled={!currentCarName}
          onClick={() => {
            setCurrentStage(3);
            dispatch(completeCarStage());
          }}
        >
          Дополнительно
        </button>
      );
    } else if (currentStage === 3) {
      return (
        <button
          className={styles.chooseModelButton}
          disabled={!(from && to && currentRate)}
          onClick={() => {
            setCurrentStage(4);
            dispatch(completeAdditionalStage());
          }}
        >
          Итого
        </button>
      );
    }
  };

  return (
    <div className={styles.orderStatus}>
      <div className={styles.yourOrderContainer}>
        <span className={styles.yourOrder}>Ваш заказ:</span>
      </div>
      {currentAddress ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Пункт выдачи</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>{`${currentAddress.city.name},`}</span>
            <span>{`${currentAddress.address}`}</span>
          </div>
        </div>
      ) : null}
      {currentCarName ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Модель</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>{currentCarName}</span>
          </div>
        </div>
      ) : null}
      {currentColor ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Цвет</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span className={styles.capitalize}>{currentColor}</span>
          </div>
        </div>
      ) : null}
      {datesDifference() ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Длительность аренды</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>{datesDifference()}</span>
          </div>
        </div>
      ) : null}
      {currentRate ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Тариф</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span >{currentRate.rateTypeId.name}</span>
          </div>
        </div>
      ) : null}
      {fulltank ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Полный бак</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>Да</span>
          </div>
        </div>
      ) : null}
      {babySeat ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Детское кресло</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>Да</span>
          </div>
        </div>
      ) : null}
      {rightHandDrive ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Правый руль</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>Да</span>
          </div>
        </div>
      ) : null}
      {renderButton()}
    </div>
  );
};

export default OrderStatus;
