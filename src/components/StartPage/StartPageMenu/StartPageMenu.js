import styles from './StartPageMenu.module.scss';
import { ReactSVG } from "react-svg";


const StartPageMenu = ({menuIsOpen, setMenuIsOpen}) => {
  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? <ReactSVG src="images/x.svg"/> : <ReactSVG src="images/menu_btn.svg" />}       
      </button>
      <button className={styles.langButton}>Eng</button>
    </div>
  );
};

export default StartPageMenu;
