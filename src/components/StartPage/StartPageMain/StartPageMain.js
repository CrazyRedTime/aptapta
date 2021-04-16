import styles from "./StartPageMain.module.scss";

const StartPageMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <span className={styles.miniName}>Need for drive</span>
        <div className={styles.cities}>
          <img alt="map" src="images/marker.svg" />
          <span className={styles.city}>Ульяновск</span>
        </div>
      </div>
      <div className={styles.articles}>
        <h2 className={styles.firstArticle}>Каршеринг</h2>
        <h2 className={styles.secondArticle}>Need for drive</h2>
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
        <span className={styles.phone}>8 (495) 234-22-44</span>
      </div>
    </div>
  );
};

export default StartPageMain;
