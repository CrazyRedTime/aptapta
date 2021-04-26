import { ReactSVG } from 'react-svg';
import styles from './OrderPageHeader.module.scss'

const OrderPageHeader = () => {
  return (
    <div className={styles.header}>
        <span className={styles.miniName}>Need for drive</span>
        <div className={styles.cities}>
          <ReactSVG src={process.env.PUBLIC_URL + '/images/marker.svg'}/>
          <span className={styles.city}>Ульяновск</span>
        </div>
      </div>
  )
}

export default OrderPageHeader;