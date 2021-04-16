import Carousel from "nuka-carousel";
import styles from "./StartPageSlider.module.scss";

const StartPageSlider = () => {
  return (
    <Carousel
      width="688px"
      wrapAround={true}
      defaultControlsConfig={{
        containerClassName: styles.buttonContainer,
        nextButtonText: ">",
        nextButtonStyle: { background: "black", height: "100%" },
        prevButtonText: "<",
        prevButtonStyle: { background: "black", height: "100%" },
      }}
    >
      <div>Slider1</div>
      <div>Slider2</div>
      <div>Slider3</div>
      <div>Slider4</div>
    </Carousel>
  );
};

export default StartPageSlider;
