import styles from "./StartPageMenu.module.scss";
import { ReactSVG } from "react-svg";
import cn from "classnames";
import { useState } from "react";

const StartPageMenu = ({ menuIsOpen, setMenuIsOpen }) => {
  const langButtonClasses = cn ([styles.langButton], {
    [styles.showMobile]: menuIsOpen,
  })

  const [lngIsRussian, setLngIsRussian] = useState(true);

  const toggleLng = (e) => {
    e.preventDefault();
    setLngIsRussian(!lngIsRussian);
  }

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
            src={process.env.PUBLIC_URL + '/images/x.svg'}
          />
        ) : (
          <ReactSVG src={process.env.PUBLIC_URL + '/images/menu_btn.svg'} />
        )}
      </button>
      <button className={langButtonClasses} onClick={(e) => toggleLng(e)}>{lngIsRussian ? 'Eng' : 'Рус'}</button>
    </div>
  );
};

export default StartPageMenu;
