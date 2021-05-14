import { useState } from "react";
import OpenedMenu from "../StartPage/OpenedMenu/OpenedMenu";
import StartPageMenu from "../StartPage/StartPageMenu/StartPageMenu";
import styles from "./OrderPage.module.scss";
import OrderPageHeader from "./OrderPageHeader/OrderPageHeader";
import OrderPageNav from "./OrderPageNav/OrderPageNav";
import MapStage from "./MapStage/MapStage";
import ChoosingCarStage from "./ChoosingCarStage/ChoosingCarStage";
import AdditionalStage from "./AdditionalStage/AdditionalStage";
import OrderStatus from "./OrderStatus/OrderStatus";
import FinalStage from "./FinalStage/FinalStage";

const OrderPage = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
          <div className={styles.leftContainer}>
            {currentStage === 1 && <MapStage />}
            {currentStage === 2 && <ChoosingCarStage />}
            {currentStage === 3 && <AdditionalStage />}
            {currentStage === 4 && <FinalStage />}
          </div>
          <OrderStatus currentStage={currentStage} setCurrentStage={setCurrentStage} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
