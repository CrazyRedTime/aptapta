import { useDispatch, useSelector } from "react-redux";
import { completeCarStage, completeMapStage } from "../../../redux/order/order";
import {
  getCurrentAddressWithMemo,
  getCurrentCarName,
} from "../../../redux/order/selectors";
import styles from "./OrderStatus.module.scss";

const OrderStatus = ({ currentStage, setCurrentStage }) => {
  const currentAddress = useSelector(getCurrentAddressWithMemo);

  const currentCarName = useSelector(getCurrentCarName);

  const dispatch = useDispatch();

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
          disabled={true}
          onClick={() => {
            setCurrentStage(3);
            dispatch(completeCarStage());
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
      {renderButton()}
    </div>
  );
};

export default OrderStatus;
