import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/css/main/Carousel.css";

const slides = [
  {
    image: "/images/meal.png",
    title: "건강을 도시락에 담다",
    subtitle: "영양 가득, 정성 가득한 맞춤형 도시락",
    backgroundColor: "#f5f9f6",
  },
  {
    image: "/images/meal.png",
    title: "당신만을 위한 식단 구성",
    subtitle: "취향과 건강을 고려한 스마트한 선택",
    backgroundColor: "#fff7ef",
  },
  {
    image: "/images/meal.png",
    title: "더 쉬운 도시락 선택",
    subtitle: "고민 없이, 클릭 한 번으로 완성되는 식단",
    backgroundColor: "#f0f4ff",
  },
];

function Carousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      loop={true}
      navigation={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="carousel-slide" style={{ backgroundColor: slide.backgroundColor }}>
            <div className="carousel-slide-inner">
              <div className="carousel-image">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="carousel-text">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
