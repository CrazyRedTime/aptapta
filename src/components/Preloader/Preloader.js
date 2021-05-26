import cn from 'classnames';

import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.car}>
        <div className={styles.strike}></div>
        <div className={cn(styles.strike, styles.strike2)}></div>
        <div className={cn(styles.strike, styles.strike3)}></div>
        <div className={cn(styles.strike, styles.strike4)}></div>
        <div className={cn(styles.strike, styles.strike5)}></div>
        <div className={cn(styles.carDetail, styles.spoiler)}></div>
        <div className={cn(styles.carDetail, styles.back)}></div>
        <div className={cn(styles.carDetail, styles.center)}></div>
        <div className={cn(styles.carDetail, styles.center1)}></div>
        <div className={cn(styles.carDetail, styles.front)}></div>
        <div className={cn(styles.carDetail, styles.wheel)}></div>
        <div className={cn(styles.carDetail, styles.wheel, styles.wheel2)}></div>
      </div>
    </div>
  );
};

export default Preloader;
