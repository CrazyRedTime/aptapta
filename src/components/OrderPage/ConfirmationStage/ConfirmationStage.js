import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector } from "react-redux";
import { getDetalsForPosting } from "../../../redux/details/selectors";
import { getOrderForPosting } from "../../../redux/order/selectors";
import api from '../../../api/api';

import styles from "./ConfirmationStage.module.scss";
import { useHistory } from "react-router";

const ConfirmationStage = ({ setConfirmation }) => {

  const orderPart = useSelector(getOrderForPosting);
  const detailsPart = useSelector(getDetalsForPosting)

  let history = useHistory();

  return (
    <div className={styles.confirmationContainer}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setConfirmation(false);
        }}
      >
        <div className={styles.confirmation}>
          <p className={styles.confirmationTitle}>Подтвердить заказ</p>
          <div className={styles.buttonsContainer}>
            <button
              className={cn(styles.confirmationButton, styles.confirmButton)}
              onClick={() => api.postOrderToApi({...orderPart, ...detailsPart})
              .then(responce => {
                const location = history.location.pathname;
                const orderId = responce.id;
                const searchString = `?orderId=${orderId}`;
                history.push(`${location}${searchString}`);
                setConfirmation(false);
              })
            }
            >
              Подвердить
            </button>
            <button
              className={cn(styles.confirmationButton, styles.returnButton)}
              onClick={() => setConfirmation(false)}
            >
              Вернуться
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default ConfirmationStage;
