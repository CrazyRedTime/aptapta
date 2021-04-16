import StartPageMenu from './StartPageMenu/StartPageMenu';
import styles from './StartPage.module.scss'
import StartPageMain from './StartPageMain/StartPageMain';
import StartPageSlider from './StartPageSlider/StartPageSlider';

const StartPage = () => {
  return (
    <div className={styles.main}>
      <StartPageMenu />
      <StartPageMain />
      <StartPageSlider />
    </div>
  )
}

export default StartPage;