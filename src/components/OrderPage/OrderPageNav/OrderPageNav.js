import styles from './OrderPageNav.module.scss';

const OrderPageNav = () => {
  return (
    <ul className={styles.nav}>
      <li><a href="/#">Местоположение</a></li>
      <li><a href="/#">Модель</a></li>
      <li><a href="/#">Дополнительно</a></li>
      <li><a href="/#">Итого</a></li>
    </ul>
  )
};

export default OrderPageNav