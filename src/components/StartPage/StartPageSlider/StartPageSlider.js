import Carousel from "nuka-carousel";
import styles from "./StartPageSlider.module.scss";

const StartPageSlider = () => {
  return (
    <Carousel
      renderCenterLeftControls={({ previousSlide }) => (
        <button onClick={previousSlide} className={styles.sliderButton}>
          <img alt="left" src="images/left.svg" />
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button onClick={nextSlide} className={styles.sliderButton}>
          <img alt="rigth" src="images/rigth.svg" />
        </button>
      )}
      width="688px"
      wrapAround={true}
      defaultControlsConfig={{
        containerClassName: styles.buttonContainer,
        pagingDotsContainerClassName: styles.paginationContainer,
        pagingDotsStyle: {
          fill: 'white',
          opacity: '1'
        },
        pagingDotsClassName: styles.dot
      }}
    >
      <div>
        <img alt="slider" src="images/slider1.png" height="100%" />
      </div>
      <div>
        <img alt="slider" src="images/slider2.png" height="100%" />
      </div>
      <div>
        <img alt="slider" src="images/slider3.png" height="100%" />
      </div>
      <div>
        <img alt="slider" src="images/slider4.png" height="100%" />
      </div>
    </Carousel>
  );
};

export default StartPageSlider;
