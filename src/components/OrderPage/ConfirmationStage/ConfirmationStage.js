import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import styles from "./ConfirmationStage.module.scss";

const ConfirmationStage = ({ setConfirmation }) => {
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
