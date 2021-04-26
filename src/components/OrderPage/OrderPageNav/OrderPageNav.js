import styles from './OrderPageNav.module.scss';
import { Link } from "react-router-dom"

const OrderPageNav = () => {
  return (
    <ul className={styles.nav}>
      <li><Link to={'#'}>Местоположение</Link></li>
      <li><Link to={'#'}>Модель</Link></li>
      <li><Link to={'#'}>Дополнительно</Link></li>
      <li><Link to={'#'}>Итого</Link></li>
    </ul>
  )
};

export default OrderPageNav