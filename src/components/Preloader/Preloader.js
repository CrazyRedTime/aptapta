import { ReactSVG } from "react-svg";
import styles from './Preloader.module.scss'

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <ReactSVG
            src={process.env.PUBLIC_URL + '/images/preloader.svg'}
          />
        </div>
    )
};

export default Preloader;