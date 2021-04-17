import styles from "./StartPageMain.module.scss";
import { ReactSVG } from "react-svg";

const StartPageMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.miniName}>Need for drive</span>
        <div className={styles.cities}>
          <ReactSVG src="images/marker.svg"/>
          <span className={styles.city}>Ульяновск</span>
        </div>
      </div>
      <div className={styles.articles}>
        <h1 className={styles.firstArticle}>Каршеринг <span>Need for drive</span></h1>
      </div>
      <div className={styles.sloganContainer}>
        <span className={styles.slogan}>
        Поминутная аренда авто твоего города
        </span>
      </div>
      <button className={styles.rentButton}>
        Забронировать
      </button>
      <div className={styles.footer}>
        <span className={styles.copyright}>© 2016-2019 «Need for drive»</span>
        <a href="tel:+74952342244" className={styles.phone}>8 (495) 234-22-44</a>
      </div>
    </div>
  );
};

export default StartPageMain;
