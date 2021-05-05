import { useState } from "react";
import OpenedMenu from "../StartPage/OpenedMenu/OpenedMenu";
import StartPageMenu from "../StartPage/StartPageMenu/StartPageMenu";
import styles from "./OrderPage.module.scss";
import OrderPageHeader from "./OrderPageHeader/OrderPageHeader";
import OrderPageNav from "./OrderPageNav/OrderPageNav";
import { useDispatch, useSelector } from "react-redux";
import MapStage from "./MapStage/MapStage";
import {
  getCurrentAddressWithMemo,
  getCurrentCarName,
} from "../../redux/order/selectors";
import { completeCarStage, completeMapStage } from "../../redux/order/order";
import ChoosingCarStage from "./ChoosingCarStage/ChoosingCarStage";
import AdditionalStage from "./AdditionalStage/AdditionalStage";

const OrderPage = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
      )
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
      )
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
      )
    }
  };

  return (
    <div className={styles.orderMain}>
      {menuIsOpen && <OpenedMenu />}
      <StartPageMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={styles.orderMainContainer}>
        <OrderPageHeader />
        <OrderPageNav
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
        />
        <div className={styles.orderWrap}>
          <div className={styles.rightContainer}>
            {currentStage === 1 && <MapStage currentAddress={currentAddress} />}
            {currentStage === 2 && <ChoosingCarStage />}
            {currentStage === 3 && <AdditionalStage />}
          </div>
          <div className={styles.leftContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
