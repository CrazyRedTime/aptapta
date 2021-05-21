import { useEffect, useState } from "react";
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
import { useHistory } from "react-router";
import queryString from 'query-string';
import { useDispatch } from "react-redux";
import { fetchPlacedOrder } from "../../redux/placedOrder/placedOrder";

const OrderPage = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (history.location.search) {
      const parsed = queryString.parse(history.location.search);
      dispatch(fetchPlacedOrder(parsed.orderId));
      setCurrentStage(4);
    } else {
      setCurrentStage(1)
    }
  }, [history.location.search, dispatch])

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
