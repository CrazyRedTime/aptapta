import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCar } from '../../../../redux/order/order';
import { getCurrentCarId } from '../../../../redux/order/selectors'
import styles from './Car.module.scss';
import cn from 'classnames';

const Car = ({car}) => {

  const letMeMakeNormalLinkForYou = (retardetLink) => {
    if (retardetLink.match('base64')) {
      return retardetLink
    }
    return `https://api-factory.simbirsoft1.com${retardetLink}`
  };

  const normalLink = letMeMakeNormalLinkForYou(car.thumbnail.path)

  const dispatch = useDispatch();

  const chooseCar = (car) => {
    dispatch(setCurrentCar(car))
  }

  const currentCar = useSelector(getCurrentCarId);

  const classes = cn(styles.car, {
    [styles.active]: car.id === currentCar
  })

  return (
    <div className={classes} onClick={() => chooseCar(car)}>
      <div className={styles.info}>
        <span className={styles.name}>{car.name}</span>
        <span className={styles.price}>{car.priceMin} - {car.priceMax} ₽</span>       
      </div>
      <div className={styles.imageContainer} >
        <div className={styles.carImage} style={{
          'backgroundImage' : `url(${normalLink})`,
        }}></div>
      </div>
    </div>
  )
};

export default Car;