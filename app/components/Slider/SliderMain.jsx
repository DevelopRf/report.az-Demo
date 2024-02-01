'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "./SliderMain.scss"
import { convertDateUTC } from '@/app/libs/date';
import { convertTimeUTC } from '@/app/libs/date';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

const SliderMain = ({ news }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

 
  return (
    <section className="mainSlider">
      <div className="wrapper">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={5}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {news && news.map(dataitem => {
          return (
            <SwiperSlide key={dataitem.id}>
              <Image src={dataitem.img} width={823} height={500} />
              <div className="info">
                <div className="category">
                  <Link href="#">{dataitem.sub_category}</Link>
                </div>
                <div className="newsTitle">
                  <Link href="#">{dataitem.title}</Link>
                </div>
                <div className="date">
                  <span>{convertDateUTC(dataitem.date)} <span>&#x2B1D;</span> {convertTimeUTC(dataitem.date)}</span>
                </div>
                <div className="pattern">

                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {news && news.map(dataitem => {
          return (
            <SwiperSlide key={dataitem.id}>
              <Image src={dataitem.img} width={823} height={500} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      </div>
    </section>
  )
}

export default SliderMain