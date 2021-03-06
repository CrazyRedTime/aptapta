import { useDispatch, useSelector } from "react-redux";
import { getCurrentCarColors } from "../../../redux/cars/selectors";
import {
  setBabySeat,
  setColor,
  setFrom,
  setFulltank,
  setRate,
  setRightHandDrive,
  setTo,
} from "../../../redux/details/actions";
import {
  getCurrentColor,
  getFromDate,
  getToDate,
  getCurrentRate,
  getFullTank,
  getBabySeat,
  getRigthHandDrive,
} from "../../../redux/details/selectors";
import Preloader from '../../Preloader/Preloader'
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays, addMinutes } from "date-fns";
import ru from "date-fns/locale/ru";
import { useEffect } from "react";
import cn from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./AdditionalStage.module.scss";
import { fetchRates } from "../../../redux/rates/actions";
import { getRatesIsFetching, getRatesWithMemo } from "../../../redux/rates/selectors";
import { getCurrentPrice } from "../../../redux/order/selectors";
import { uncompleteAdditionalStage } from "../../../redux/order/actions";

const AdditionalStage = () => {
  const dispatch = useDispatch();

  const colors = useSelector(getCurrentCarColors);
  const currentColor = useSelector(getCurrentColor);
  const from = useSelector(getFromDate);
  const to = useSelector(getToDate);
  const rates = useSelector(getRatesWithMemo);
  const currentRate = useSelector(getCurrentRate);
  const fulltank = useSelector(getFullTank);
  const babySeat = useSelector(getBabySeat);
  const rightHandDrive = useSelector(getRigthHandDrive);
  const currentPrice = useSelector(getCurrentPrice);
  const ratesIfFetching = useSelector(getRatesIsFetching);

  useEffect(() => {
    if (!currentPrice) {
      dispatch(uncompleteAdditionalStage());
    }
  }, [currentPrice, dispatch]);

  useEffect(() => {
    registerLocale("ru", ru);
  }, []);

  useEffect(() => {
    if (!rates.length) {
      dispatch(fetchRates());
    }
  }, [dispatch, rates]);

  const onColorChange = (e) => {
    dispatch(setColor(e.target.value));
  };

  const onFromChange = (from) => {
    dispatch(setFrom(from));
  };

  const onToChange = (to) => {
    dispatch(setTo(to));
  };

  const onRateChange = (rate) => {
    dispatch(setRate(rate));
  };

  const onFulltankChange = () => {
    dispatch(setFulltank(!fulltank))
  };

  const onBabySeatChange = () => {
    dispatch(setBabySeat(!babySeat));
  };

  const onRigthHandDriveChange = () => {
    dispatch(setRightHandDrive(!rightHandDrive));
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    // if (to) {
    //   return currentDate.getTime() < selectedDate.getTime() && selectedDate.getTime() <= to.getTime();
    // }
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterFutureTime = (time) => {
    const currentDate = from
      ? addMinutes(new Date(from), 30)
      : addMinutes(new Date(), 30);
    const selectedDate = new Date(time);
    return currentDate.getTime() <= selectedDate.getTime();
  };

  return (
    <div className={styles.additionalContainer}>
      {ratesIfFetching  && <Preloader />}
      <div className={cn(styles.additionalItem, styles.radio)}>
        <span className={styles.additionalTitle}>????????</span>
        <div className={styles.colorsContainer}>
          <div className={styles.colorWrapper}>
            <input
              id="color0"
              type="radio"
              value="??????????"
              checked={currentColor === "??????????"}
              onChange={onColorChange}
            />{" "}
            <label htmlFor="color0">??????????</label>
          </div>
          {colors.map((color, index) => {
            return (
              <div className={styles.colorWrapper} key={index}>
                <input
                  id={`color${index + 1}`}
                  type="radio"
                  value={color}
                  checked={color === currentColor}
                  onChange={onColorChange}
                />
                <label htmlFor={`color${index + 1}`}>
                  {" "}
                  {color}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cn(styles.additionalItem, styles.datePicker)}>
        <span className={styles.additionalTitle}>???????? ????????????</span>
        <div className={styles.wrapdate}>
          <label>
            <span className={styles.dateTitle}>C</span>
            <DatePicker
              placeholderText="?????????????? ???????? ?? ??????????"
              locale="ru"
              clearButtonClassName={styles.clearButton}
              selected={from}
              minDate={new Date()}
              maxDate={to ? to : addDays(new Date(), 30)}
              filterTime={filterPassedTime}
              // minTime={new Date()}
              // maxTime={to ? to : setHours(setMinutes(new Date(), 59), 23)}
              onChange={(date) => {
                onFromChange(date);
                onToChange(null);
              }}
              showTimeSelect
              isClearable
              dateFormat="dd.MM.yyyy HH:mm "
            />
          </label>
        </div>
        <div className={styles.wrapdate}>
          <label>
            <span className={styles.dateTitle}>????</span>
            <DatePicker
              placeholderText="?????????????? ???????? ?? ??????????"
              locale="ru"
              clearButtonClassName={styles.clearButton}
              selected={to}
              minDate={from ? from : new Date()}
              maxDate={from ? addDays(from, 30) : addDays(new Date(), 30)}
              filterTime={filterFutureTime}
              // minTime={new Date()}
              // maxTime={to ? to : setHours(setMinutes(new Date(), 59), 23)}
              onChange={(date) => onToChange(date)}
              showTimeSelect
              isClearable
              dateFormat="dd.MM.yyyy HH:mm "
            />
          </label>
        </div>
      </div>
      <div className={cn(styles.additionalItem, styles.radio)}>
        <span className={styles.additionalTitle}>??????????</span>
        <div className={styles.ratesContainer}>
          {rates.map((rate) => {
            return (
              <div className={styles.raterWrapper} key={rate.id}>
                <input
                  id={rate.id}
                  type="radio"
                  checked={currentRate.id === rate.id}
                  onChange={() => onRateChange(rate)}
                />
                <label htmlFor={rate.id} className={styles.labelInline}>
                  {" "}
                  {`${rate.rateTypeId.name}, ${rate.price}???/${rate.rateTypeId.unit}`}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cn(styles.additionalItem, styles.options)}>
        <span className={styles.additionalTitle}>?????? ????????????</span>

        <div className={styles.wrapperchecedprice}>
          <input
            id="type1"
            type="checkbox"
            checked={fulltank}
            onChange={onFulltankChange}
          />
          <label htmlFor="type1" className={styles.labelInline}> ???????????? ??????, 500??</label>
        </div>

        <div className={styles.wrapperchecedprice}>
          <input
            id="type2"
            type="checkbox"
            checked={babySeat}
            onChange={onBabySeatChange}
          />
          <label htmlFor="type2" className={styles.labelInline}> ?????????????? ????????????, 200??</label>
        </div>

        <div className={styles.wrapperchecedprice}>
          <input
            id="type3"
            type="checkbox"
            checked={rightHandDrive}
            onChange={onRigthHandDriveChange}
          />
          <label htmlFor="type3" className={styles.labelInline}> ???????????? ????????, 1600??</label>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStage;
