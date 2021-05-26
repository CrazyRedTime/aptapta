import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { useHistory } from "react-router";
import { getDetals } from "../../../redux/details/selectors";
import {
  completeAdditionalStage,
  completeCarStage,
  completeMapStage,
  fetchOrderStatusId,
  setCurrentPrice,
} from "../../../redux/order/actions";
import { getOrder } from "../../../redux/order/selectors";
import styles from "./OrderStatus.module.scss";
import ConfirmationStage from "../ConfirmationStage/ConfirmationStage";
import { getPlacedOrderWithMemo } from "../../../redux/placedOrder/selectors";
import { clearPlacedOrder } from "../../../redux/placedOrder/actions";

const OrderStatus = ({ currentStage, setCurrentStage }) => {
  let history = useHistory();

  const {
    currentAddress,
    currentCarName,
    currentCarPrices,
    currentPrice,
    orderStatusId,
  } = useSelector(getOrder);

  const {
    currentColor,
    from,
    to,
    currentRate,
    fulltank,
    babySeat,
    rightHandDrive,
  } = useSelector(getDetals);

  const {
    pointId,
    cityId,
    carId,
    color,
    dateFrom,
    dateTo,
    rateId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
  } = useSelector(getPlacedOrderWithMemo);

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
    if (!currentAddress) {
      setShowDetails(false)
    }
  }, [currentAddress])

  useEffect(() => {
    if (!orderStatusId && !history.location.search) {
      dispatch(fetchOrderStatusId());
    }
  }, [orderStatusId, dispatch, history.location.search]);

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
  }, [datesInterval, day, hour]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setDatesInterval(Math.round((dateTo - dateFrom) / 10000) * 10000);
    } else if (to && from && to > from) {
      setDatesInterval(Math.round((to - from) / 10000) * 10000);
    } else {
      setDatesInterval(null);
    }
  }, [from, to, dateFrom, dateTo]);

  useEffect(() => {
    if (currentRate && datesInterval) {
      let price = null;
      if (currentRate.rateTypeId.id === "5e26a07f099b810b946c5d82") {
        price = (datesInterval / min) * currentRate.price;
      } else if (currentRate.rateTypeId.id === "5e26a082099b810b946c5d83") {
        price = Math.ceil(datesInterval / day) * currentRate.price;
      } else if (currentRate.rateTypeId.id === "5f622f029d3a610b850fd820") {
        price = Math.ceil(datesInterval / week) * currentRate.price;
      }
      dispatch(
        setCurrentPrice(
          price + fulltank * 500 + babySeat * 200 + rightHandDrive * 1600
        )
      );
    } else {
      dispatch(setCurrentPrice(null));
    }
  }, [
    currentRate,
    datesInterval,
    day,
    week,
    fulltank,
    babySeat,
    rightHandDrive,
    dispatch,
  ]);

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
      if (pointId) {
        return (
          <button
            className={cn(styles.chooseModelButton, styles.cancelButton)}
            onClick={() => {
              dispatch(clearPlacedOrder());
              const location = history.location.pathname;
              history.push(location);
            }}
          >
            Отменить
          </button>
        );
      }
      return (
        <button
          className={styles.chooseModelButton}
          disabled={!currentRate}
          onClick={() => {
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
      {currentAddress && (
        <div className={cn({ [styles.detailsContainer]: !showDetails, [styles.detailsMobile]: showDetails, [styles.placedOrderDetails]: showDetails && history.location.search })}>
          <div className={styles.yourOrderContainer}>
            <span className={styles.yourOrder}>Ваш заказ:</span>
          </div>
          {pointId || currentAddress ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Пункт выдачи</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>{`${
                  cityId ? cityId.name : currentAddress.city.name
                },`}</span>
                <span>{`${
                  pointId ? pointId.address : currentAddress.address
                }`}</span>
              </div>
            </div>
          ) : null}
          {carId || currentCarName ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Модель</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>{carId ? carId.name : currentCarName}</span>
              </div>
            </div>
          ) : null}
          {color || currentColor ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Цвет</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span className={styles.capitalize}>
                  {color ? color : currentColor}
                </span>
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
          {rateId || currentRate ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Тариф</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>
                  {rateId
                    ? rateId.rateTypeId.name
                    : currentRate.rateTypeId.name}
                </span>
              </div>
            </div>
          ) : null}
          {isFullTank || fulltank ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Полный бак</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>Да</span>
              </div>
            </div>
          ) : null}
          {isNeedChildChair || babySeat ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Детское кресло</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>Да</span>
              </div>
            </div>
          ) : null}
          {isRightWheel || rightHandDrive ? (
            <div className={styles.orderPoint}>
              <span className={styles.pointTitle}>Правый руль</span>
              <span className={styles.dots}></span>
              <div className={styles.point}>
                <span>Да</span>
              </div>
            </div>
          ) : null}
          {price || currentCarPrices || currentPrice ? (
            <div className={styles.totalPriceContainer}>
              <span className={styles.yourOrder}>{`Цена: ${
                price
                  ? `${price} ₽`
                  : currentPrice
                  ? `${currentPrice} ₽`
                  : `${currentCarPrices}`
              }`}</span>
            </div>
          ) : null}
        </div>
      )}

      <div className={styles.buttons}>
        <button
          disabled={!currentAddress && !pointId}
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Скрыть детали заказа" : "Показать детали заказа"}
        </button>
        {renderButton()}
        {confirmation ? (
          <ConfirmationStage setConfirmation={setConfirmation} />
        ) : null}
      </div>
    </div>
  );
};

export default OrderStatus;
