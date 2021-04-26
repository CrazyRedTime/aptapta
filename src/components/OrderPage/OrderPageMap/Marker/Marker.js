import styles from "./Marker.module.scss";
import cn from 'classnames';

const Marker = ({ color, name }) => {
  return (
    <div>
        <div
          className={cn(styles.pin, styles.bounce)}
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className={styles.pulse} />
      </div>
  );
};

export default Marker;
