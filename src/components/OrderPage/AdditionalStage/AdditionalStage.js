import { useDispatch, useSelector } from "react-redux";
import { getCurrentCarColors } from "../../../redux/cars/selectors";
import { setColor, setFrom, setTo } from "../../../redux/details/details";
import {
  getCurrentColor,
  getFromDate,
  getToDate,
} from "../../../redux/details/selectors";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDays, addMinutes } from "date-fns";
import ru from "date-fns/locale/ru";
import api from '../../../api/api'
import { useEffect } from "react";


import "react-datepicker/dist/react-datepicker.css";
import styles from "./AdditionalStage.module.scss";


const AdditionalStage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    registerLocale("ru", ru);
  }, []);

  useEffect(() => {
    api.getRateFromApi()
  }, []);

  const colors = useSelector(getCurrentCarColors);
  const currentColor = useSelector(getCurrentColor);
  const from = useSelector(getFromDate);
  const to = useSelector(getToDate);

  const onColorChange = (e) => {
    dispatch(setColor(e.target.value));
  };

  const onFromChange = (from) => {
    dispatch(setFrom(from));
  };

  const onToChange = (to) => {
    dispatch(setTo(to));
  };

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    // if (to) {
    //   return currentDate.getTime() < selectedDate.getTime() && selectedDate.getTime() <= to.getTime();
    // }
    return currentDate.getTime() < selectedDate.getTime();
  }

  const filterFutureTime = time => {
    const currentDate = from ? addMinutes(new Date(from), 30) : addMinutes(new Date(), 30);
    const selectedDate = new Date(time);
    return currentDate.getTime() <= selectedDate.getTime();
  }

  return (
    <div>
      <span>Цвет</span>
      <div>
        <label>
          <input
            type="radio"
            value=""
            checked={currentColor === ""}
            onChange={onColorChange}
          />{" "}
          Любой
        </label>
        {colors.map((color, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                value={color}
                checked={color === currentColor}
                onChange={onColorChange}
              />{" "}
              {color}
            </label>
          );
        })}
      </div>
      <div className={styles.dates}>
        <span>Дата аренды</span>
        <div>
          <label>
            <span>C</span>
            <DatePicker
              placeholderText="Введите дату и время"
              locale="ru"
              selected={from}
              minDate={new Date()}
              maxDate={to ? to : addDays(new Date(), 30)}
              filterTime={filterPassedTime}
              // minTime={new Date()}
              // maxTime={to ? to : setHours(setMinutes(new Date(), 59), 23)}
              onChange={(date) => {
                onFromChange(date);
                onToChange(null)
              }}
              showTimeSelect
              isClearable
              dateFormat="dd.MM.yyyy HH:mm "
            />
          </label>
          </div>
          <div>
          <label>
            <span>По</span>
            <DatePicker
              placeholderText="Введите дату и время"
              locale="ru"
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
    </div>
  );
};

export default AdditionalStage;
