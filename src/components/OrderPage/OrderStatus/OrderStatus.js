import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from 'classnames';
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
  setCurrentPrice,
} from "../../../redux/order/order";
import {
  getCurrentAddressWithMemo,
  getCurrentCarName,
  getCurrentCarPrices,
  getCurrentPrice,
} from "../../../redux/order/selectors";
import styles from "./OrderStatus.module.scss";
import ConfirmationStage from "../ConfirmationStage/ConfirmationStage";

const OrderStatus = ({ currentStage, setCurrentStage }) => {
  const currentAddress = useSelector(getCurrentAddressWithMemo);

  const currentCarName = useSelector(getCurrentCarName);
  const currentCarPrices = useSelector(getCurrentCarPrices);
  const currentColor = useSelector(getCurrentColor);
  const from = useSelector(getFromDate);
  const to = useSelector(getToDate);
  const currentRate = useSelector(getCurrentRate);
  const fulltank = useSelector(getFullTank);
  const babySeat = useSelector(getBabySeat);
  const rightHandDrive = useSelector(getRigthHandDrive);
  const currentPrice = useSelector(getCurrentPrice);

  const [datesInterval, setDatesInterval] = useState(null);
  const [intervalString, setIntervalString] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const dispatch = useDispatch();

  const min = 60000;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;

  useEffect(() => {
    const datesDifference = () => {
      if (datesInterval) {
        let diff = datesInterval;
        const days = Math.floor(diff / day);
        diff -= days * day;
        const hours = Math.floor(diff / hour);
        diff -= hours * hour;
        const minutes = Math.ceil(diff / min);
        return `${days >= 1 ? `${days}д` : ""}${hours >= 1 ? `${hours}ч` : ""}${
          minutes >= 1 ? `${minutes}мин` : ""
        }`;
      }
      return null;
    };
    const newIntervalString = datesDifference();
    setIntervalString(newIntervalString);
  }, [datesInterval, day, hour])

  useEffect(() => {
    if (to && from && to > from) {
      setDatesInterval((Math.round((to - from) / 10000)) * 10000);
    } else {
      setDatesInterval(null)
    }
  }, [from, to]);

  useEffect(() => {
    if (currentRate && datesInterval) {
      let price = null;
      if (currentRate.rateTypeId.id === "5e26a07f099b810b946c5d82") {
        price = datesInterval / min * currentRate.price;
      } else if (currentRate.rateTypeId.id === "5e26a082099b810b946c5d83") {
        price = Math.ceil(datesInterval / day) * currentRate.price;
      } else if (currentRate.rateTypeId.id === "5f622f029d3a610b850fd820") {
        price = Math.ceil(datesInterval / week) * currentRate.price;
      }
      dispatch(setCurrentPrice(price + fulltank * 500 + babySeat * 200 + rightHandDrive * 1600));
    } else {
      dispatch(setCurrentPrice(null));
    }
  }, [currentRate, datesInterval, day, week, fulltank, babySeat, rightHandDrive, dispatch])

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
          disabled={!(from && to && currentRate && currentColor)}
          onClick={() => {
            setCurrentStage(4);
            dispatch(completeAdditionalStage());
          }}
        >
          Итого
        </button>
      );
    } else if (currentStage === 4) {
      return (
        <button
          className={styles.chooseModelButton}
          onClick={() => {
            console.log('подтверждение заказа')
            setConfirmation(true);
          }}
        >
          Заказать
        </button>
      );
    }
  };

  return (
    <div className={styles.orderStatus}>
      <button disabled={!currentAddress} className={styles.detailsButton} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Скрыть детали заказа' : 'Показать детали заказа'}</button>
      <div className={cn({[styles.detailsContainer] : !showDetails})}>
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
      {intervalString ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Длительность аренды</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>{intervalString}</span>
          </div>
        </div>
      ) : null}
      {currentRate ? (
        <div className={styles.orderPoint}>
          <span className={styles.pointTitle}>Тариф</span>
          <span className={styles.dots}></span>
          <div className={styles.point}>
            <span>{currentRate.rateTypeId.name}</span>
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
      {currentCarPrices || currentPrice ? (
        <div className={styles.totalPriceContainer}>
          <span className={styles.yourOrder}>{`Цена: ${currentPrice ? `${currentPrice} ₽` : `${currentCarPrices}`}`}</span>
        </div>
      )
       : null}
      </div>
      {renderButton()}
      {confirmation ? <ConfirmationStage setConfirmation={setConfirmation} /> : null}
    </div>
  );
};

export default OrderStatus;
