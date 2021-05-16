import styles from "./OpenedMenu.module.scss";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const OpenedMenu = () => {
  return (
    <div className={styles.openedMenu}>
      <div className={styles.menuContainer}>
        <div className={styles.centerContent}>
          <ul className={styles.menu}>
            <li><Link to={"#"}>ПАРКОВКА</Link></li>
            <li><Link to={"#"}>СТРАХОВКА</Link></li>
            <li><Link to={"#"}>БЕНЗИН</Link></li>
            <li><Link to={"#"}>ОБСЛУЖИВАНИЕ</Link></li>
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
