import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "@/css/main/Carousel.module.css";
import banner1 from "@/assets/images/mock/banner1.png";
import banner2 from "@/assets/images/mock/banner2.png";

const slides = [{ image: banner1 }, { image: banner2 }];

function Carousel() {
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        navigation={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={styles.carouselSlideImageOnly}>
              <img src={slide.image} alt={`배너 ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
