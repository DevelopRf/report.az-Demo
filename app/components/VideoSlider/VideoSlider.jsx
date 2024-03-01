"use client"
import Image from "next/image";
import "./VideoSlider.scss"
import localFont from "next/font/local"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useAppContext } from "@/app/Hooks/Hook";

import { EffectFade, Pagination, Autoplay } from 'swiper/modules';

const MontserratExtraBold = localFont({ src: '../../fonts/Montserrat-ExtraBold.woff2' })

const VideoSlider = ({ videoNews }) => {
    const { dark } = useAppContext()

    return (
        <div className="videoNews">
            <div className={`title ${dark ? "active" : ""}`}>
                <h2>VİDEO XƏBƏRLƏR</h2>
            </div>
            <div className="wrapper">
                <Swiper
                    autoplay={
                        {
                            delay: 3000,
                            disableOnInteraction: false
                        }
                    }
                    spaceBetween={30}
                    effect={'fade'}
                    pagination={{
                        clickable: true
                    }}
                    modules={[EffectFade, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {
                        videoNews && videoNews.map(item => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <iframe width="500" height="225" src={item.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div >
    )
}

export default VideoSlider