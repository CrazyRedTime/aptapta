import styles from './StartPageMenu.module.scss'

const StartPageMenu = () => {
  return (
    <div className={styles.menu}>
      <button className={styles.menuButton}>
        <img alt="menu" src="images/menu_btn.svg"></img>
      </button>
      <button className={styles.langButton}>Eng</button>
    </div>
  );
};

export default StartPageMenu;
