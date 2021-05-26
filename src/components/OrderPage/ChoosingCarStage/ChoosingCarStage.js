import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../../redux/cars/actions";
import {
  getCarsIsFetching,
  getCarsWithMemo,
  getCategoriesWithMemo,
} from "../../../redux/cars/selectors";
import { setCurrentCategory } from "../../../redux/order/actions";
import { getCurrentCategory } from "../../../redux/order/selectors";
import Car from "./Car/Car";
import Preloader from "../../Preloader/Preloader";
import styles from "./ChoosingCarStage.module.scss";

const ChoosingCarStage = () => {
  const dispatch = useDispatch();

  const currentCategory = useSelector(getCurrentCategory);

  const cars = useSelector(getCarsWithMemo);

  const categories = useSelector(getCategoriesWithMemo);

  const carsIsFetching = useSelector(getCarsIsFetching);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onRadioChange = (e) => {
    dispatch(setCurrentCategory(e.target.value));
  };

  const filteredCars = currentCategory
    ? cars.filter((car) => car.categoryId.id === currentCategory)
    : cars;

  return (
    <div>
      {carsIsFetching && <Preloader />}
      <div className={styles.categories}>
        <div className={styles.radio}>
          <div className={styles.categoryWrapper}>
            <input
              id={"category0"}
              type="radio"
              value={""}
              checked={currentCategory === ""}
              onChange={onRadioChange}
            />
            <label htmlFor={"category0"}> Все категории</label>
          </div>
          {categories.map((category) => {
            return (
              <div className={styles.categoryWrapper} key={category.id}>
                <input
                  id={category.id}
                  type="radio"
                  value={category.id}
                  checked={currentCategory === category.id}
                  onChange={onRadioChange}
                />
                <label htmlFor={category.id}> {category.name}</label>
              </div>
            );
          })}
        </div>
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
