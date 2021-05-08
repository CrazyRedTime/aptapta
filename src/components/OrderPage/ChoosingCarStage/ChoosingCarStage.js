import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../redux/cars/cars";
import { getCarsWithMemo, getCategoriesWithMemo } from "../../../redux/cars/selectors";
import { setCurrentCategory } from "../../../redux/order/order";
import { getCurrentCategory } from "../../../redux/order/selectors";
import Car from "./Car/Car";
import styles from "./ChoosingCarStage.module.scss";

const ChoosingCarStage = () => {
  const dispatch = useDispatch();

  const currentCategory = useSelector(getCurrentCategory);

  const cars = useSelector(getCarsWithMemo);

  const categories = useSelector(getCategoriesWithMemo);

  useEffect(() => {
    if (!cars.length) {
      dispatch(fetchCars());
    }
  }, [dispatch, cars]);

  const onRadioChange = (e) => {
    dispatch(setCurrentCategory(e.target.value));
  }

  const filteredCars = currentCategory ? cars.filter(car => car.categoryId.id === currentCategory) : cars;

  return (
    <div>
      <div className={styles.radio}>
        <label><input type="radio" value='' checked={currentCategory === ''} onChange={onRadioChange} /> Все категории</label>
        {categories.map((category) => {
          return <label key={category.id}><input type="radio" value={category.id} checked={currentCategory === category.id} onChange={onRadioChange} /> {category.name}</label>
        })}
      </div>
      <div className={styles.carsContainer}>
        {filteredCars.map((car) => {
          return <Car key={car.id} car={car} />;
        })}
      </div>
    </div>
  );
};

export default ChoosingCarStage;
