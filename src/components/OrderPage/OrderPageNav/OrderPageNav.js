import styles from "./OrderPageNav.module.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useSelector } from "react-redux";
import { getAdditionalStageISCompleted, getCarStageIsCompleted, getFinalStageIsCompleted, getMapStageIsCompleted } from "../../../redux/order/selectors";

const OrderPageNav = ({
  currentStage,
  setCurrentStage,
}) => {
  
  const mapStageIsCompleted = useSelector(getMapStageIsCompleted);
  const carStageIsCompleted = useSelector(getCarStageIsCompleted);
  const additionalStageIsCompleted = useSelector(getAdditionalStageISCompleted);
  const finalStageIsCompleted = useSelector(getFinalStageIsCompleted);

  return (
    <ul className={styles.nav}>
      <li>
        <Link
          className={cn(styles.link, {
            [styles.active]: currentStage === 1,
          })}
          to={"#"}
          onClick={() => setCurrentStage(1)}
        >
          Местоположение
        </Link>
      </li>
      <li>
        <Link
          className={cn(styles.link, {
            [styles.active]: currentStage === 2,
            [styles.disabled]: !mapStageIsCompleted
          })}
          to={"#"}
          onClick={() => setCurrentStage(2)}
        >
          Модель
        </Link>
      </li>
      <li>
        <Link
          className={cn(styles.link, {
            [styles.active]: currentStage === 3,
            [styles.disabled]: !carStageIsCompleted
          })}
          to={"#"}
          onClick={() => setCurrentStage(3)}
        >
          Дополнительно
        </Link>
      </li>
      <li>
        <Link
          className={cn(styles.link, {
            [styles.active]: currentStage === 4,
            [styles.disabled]: !additionalStageIsCompleted
          })}
          to={"#"}
          onClick={() => setCurrentStage(4)}
        >
          Итого
        </Link>
      </li>
    </ul>
  );
};

export default OrderPageNav;
