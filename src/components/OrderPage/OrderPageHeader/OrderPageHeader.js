import { useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { getCurrentCityWithMemo } from '../../../redux/order/selectors';
import { getPlacedOrderWithMemo } from '../../../redux/placedOrder/selectors';
import styles from './OrderPageHeader.module.scss'

const OrderPageHeader = () => {
  const currentCity = useSelector(getCurrentCityWithMemo);

  const {cityId} = useSelector(getPlacedOrderWithMemo);

  return (
    <div className={styles.header}>
        <span className={styles.miniName}>Need for drive</span>
        <div className={styles.cities}>
          <ReactSVG src={process.env.PUBLIC_URL + '/images/marker.svg'}/>
          <span className={styles.city}>{cityId ? cityId.name : currentCity ? currentCity.name : 'Ульяновск'}</span>
        </div>
      </div>
  )
}

export default OrderPageHeader;