import Carousel from "nuka-carousel";
import styles from "./StartPageSlider.module.scss";

const StartPageSlider = () => {

  const sliders = [
    {
      imgLink: "/images/slider1.png",
      article: "Бесплатная парковка",
      text:
        "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
      buttonColor: "green",
    },
    {
      imgLink: "/images/slider2.png",
      article: "Страховка",
      text: "Полная страховка автомобиля",
      buttonColor: "blue",
    },
    {
      imgLink: "/images/slider3.png",
      article: "Бензин",
      text: "Полный бак на любой заправке города за наш счёт",
      buttonColor: "red",
    },
    {
      imgLink: "/images/slider4.png",
      article: "Обслуживание",
      text: "Автомобиль проходит еженедельное ТО",
      buttonColor: "purple",
    },
  ];

  return (
    <Carousel
      renderBottomCenterControls={({ slideCount, currentSlide, goToSlide }) => (
        <div className="slider-control-bottomcenter">
          <ul>
            {[...Array(slideCount)].map((e, key) => (
              <li
                className={currentSlide === key ? "active" : undefined}
                key={key}
              >
                <button
                  type="button"
                  aria-label="slide 1 bullet"
                  onClick={() => goToSlide(key)}
                >
                  <svg width="12" height="12">
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      renderCenterLeftControls={({ previousSlide }) => (
        <button onClick={previousSlide} className={styles.sliderButton}>
          <img alt="left" src={process.env.PUBLIC_URL + '/images/left.svg'} />
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button onClick={nextSlide} className={styles.sliderButton}>
          <img alt="right" src={process.env.PUBLIC_URL + '/images/right.svg'} />
        </button>
      )}
      width="688px"
      speed={100}
      wrapAround={true}
      defaultControlsConfig={{
        containerClassName: styles.buttonContainer,
        pagingDotsContainerClassName: styles.paginationContainer,
        pagingDotsStyle: {
          fill: "white",
          opacity: "1",
        },
        pagingDotsClassName: styles.dot,
      }}
    >
      {sliders.map((slider, index) => {
        return (
          <div className={styles.sliderItem} key={index}>
            <div className={styles.wrapImg}>
              <img
                className={styles.sliderImg}
                alt="slider"
                src={process.env.PUBLIC_URL + slider.imgLink}
              />
            </div>

            <div className={styles.sliderContent}>
              <h3>{slider.article}</h3>
              <p>{slider.text}</p>
              <button
                className={styles[slider.buttonColor]}
                onClick={() => {
                  console.log("click");
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default StartPageSlider;
