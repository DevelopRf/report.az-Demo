'use client'
import Link from 'next/link';
import { convertDateUTC, convertTimeUTC } from '@/app/libs/date';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import "./UrgentNews.scss";
import "../../styles/fontello/css/fontello.css"

export const UrgentNews = ({ news }) => {
    return (
        <section className="urgentNews">
            <div className="wrapper">
                <div className="title">
                    <i className="icon-flash"></i>
                    <h3>TƏCİLİ XƏBƏRLƏR</h3>
                </div>
                <div className="content">
                    <Swiper
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false
                        }}

                        spaceBetween={5}
                        loop={true}
                        navigation={{
                            nextEl: ".next",
                            prevEl: ".prev"
                        }}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                    >
                        {
                            news && news.map(item => {
                                return (<SwiperSlide key={item.id}><div className="newsTitle"><Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link></div>
                                    <div className="date"><span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span></div></SwiperSlide>)
                            })
                        }
                    </Swiper>
                    <marquee behavior="scroll" direction="left" scrollamount="6">
                        <div className="scrollingText">
                            {
                                news && news.map(item => {
                                    return (
                                        <div className="newsItem" key={item.id} >
                                            <div className="newsTitle"><Link href={`${item.catUrl}/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link></div>
                                            <div className="date"><span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </marquee>
                    <div className="navigator">
                        <div className="prev"></div>
                        <div className="next"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}