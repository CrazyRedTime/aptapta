import styles from "./StartPageMenu.module.scss";
import { ReactSVG } from "react-svg";
import cn from "classnames";

const StartPageMenu = ({ menuIsOpen, setMenuIsOpen }) => {
  const langButtonClasses = cn ([styles.langButton], {
    [styles.showMobile]: menuIsOpen,
  })

  return (
    <div className={styles.menu}>
      <button
        className={styles.menuButton}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        {menuIsOpen ? (
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add(styles.closeButton);
            }}
            src="images/x.svg"
          />
        ) : (
          <ReactSVG src="images/menu_btn.svg" />
        )}
      </button>
      <button className={langButtonClasses}>Eng</button>
    </div>
  );
};

export default StartPageMenu;
