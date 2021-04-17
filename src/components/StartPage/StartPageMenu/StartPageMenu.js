import styles from './StartPageMenu.module.scss'

const StartPageMenu = ({menuIsOpen, setMenuIsOpen}) => {
  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? <img alt="close" src="images/x.svg"></img> : <img alt="menu" src="images/menu_btn.svg"></img>}       
      </button>
      <button className={styles.langButton}>Eng</button>
    </div>
  );
};

export default StartPageMenu;
