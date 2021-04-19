import styles from "./OpenedMenu.module.scss";
import { ReactSVG } from "react-svg";

const OpenedMenu = () => {
  return (
    <div className={styles.openedMenu}>
      <div className={styles.menuContainer}>
        <div className={styles.centerContent}>
          <ul className={styles.menu}>
            <li><a href="/#">ПАРКОВКА</a></li>
            <li><a href="/#">СТРАХОВКА</a></li>
            <li><a href="/#">БЕНЗИН</a></li>
            <li><a href="/#">ОБСЛУЖИВАНИЕ</a></li>
          </ul>
          <ul className={styles.social}>
            <li>
              <a href="/#">
              <ReactSVG
                beforeInjection={(svg) => {
                  svg.classList.add(styles.icon);
                }}
                src={process.env.PUBLIC_URL + '/images/telegram.svg'}
              />
            </a>
            </li>
            <li>
            <a href="/#">
              <ReactSVG
                  beforeInjection={(svg) => {
                    svg.classList.add(styles.icon);
                  }}
                  src={process.env.PUBLIC_URL + '/images/facebook.svg'}
                />
              </a>
            </li>
            <li>
              <a href="/#">
                <ReactSVG
                  beforeInjection={(svg) => {
                    svg.classList.add(styles.icon);
                  }}
                  src={process.env.PUBLIC_URL + '/images/instagram.svg'}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OpenedMenu;
