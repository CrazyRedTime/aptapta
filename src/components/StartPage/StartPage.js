import StartPageMenu from './StartPageMenu/StartPageMenu';
import styles from './StartPage.module.scss'
import StartPageMain from './StartPageMain/StartPageMain';
import StartPageSlider from './StartPageSlider/StartPageSlider';
import { useState } from 'react';
import OpenedMenu from './OpenedMenu/OpenedMenu';

const StartPage = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  return (
    <div className={styles.main}>
      {menuIsOpen && <OpenedMenu />}
      <StartPageMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <StartPageMain />
      <StartPageSlider />
    </div>
  )
}

export default StartPage;