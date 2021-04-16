import styles from './StartPageMenu.module.scss'

const StartPageMenu = () => {
  return (
    <div className={styles.menu}>
      <button className={styles.button}>
        <img alt="menu" src="images/menu_btn.svg"></img>
      </button>
    </div>
  );
};

export default StartPageMenu;
