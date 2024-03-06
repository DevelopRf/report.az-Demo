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
          {news && news.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <Image src={item.img} width={823} height={500} alt={item.title} />
                <div className="info">
                  <div className="category">
                    <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}`}>{item.sub_category ? item.sub_category : item.category}</Link>
                  </div>
                  <div className="newsTitle">
                    <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}/${item.id}`}>{item.title}</Link>
                  </div>
                  <div className="date">
                    <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
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
          {news && news.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <Image src={item.img} width={823} height={500} alt={item.title} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default SliderMain