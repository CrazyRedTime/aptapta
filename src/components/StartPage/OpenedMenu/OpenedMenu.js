import styles from "./OpenedMenu.module.scss";
import { ReactSVG } from "react-svg";

const OpenedMenu = () => {
  return (
    <div className={styles.openedMenu}>
      <div className={styles.menuContainer}>
        <ul className={styles.menu}>
          <li>ПАРКОВКА</li>
          <li>СТРАХОВКА</li>
          <li>БЕНЗИН</li>
          <li>ОБСЛУЖИВАНИЕ</li>
        </ul>
        <div className={styles.social}>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(styles.icon);
            }}
            src="images/telegram.svg"
          />
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(styles.icon);
            }}
            src="images/facebook.svg"
          />
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(styles.icon);
            }}
            src="images/instagram.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenedMenu;
