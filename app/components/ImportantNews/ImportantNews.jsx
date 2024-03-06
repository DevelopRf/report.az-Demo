'use client'
import Link from 'next/link';
import Image from 'next/image';
import { convertDateUTC, convertTimeUTC } from '@/app/libs/date';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "./ImportantNews.scss";
import "../../styles/fontello/css/fontello.css"
import { useAppContext } from '@/app/Hooks/Hook';

export const ImportantNews = ({ news }) => {

    const { dark } = useAppContext()
    let i = 0

    return (
        <section className="ImportantNews">
            <div className="wrapper">
                <div className={`title ${dark ? "active" : ""}`}>
                    <h2>ƏN VACİB XƏBƏRLƏR</h2>
                    <div className="navigator">
                        <div className="prev"></div>
                        <div className="next"></div>
                    </div>
                </div>
                <div className="content">
                    <Swiper
                        slidesPerView={1}
                        breakpoints={{
                            574: { slidesPerView: 3 }
                        }}
                        spaceBetween={30}
                        loop={false}
                        navigation={{
                            nextEl: ".next",
                            prevEl: ".prev"
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {
                            news && news.map(item => {
                                return (<SwiperSlide key={item.id}><div className="newsCard">
                                    <div className="image">
                                        <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}/${item.id}`}><Image src={item.img} width={180} height={106} alt={item.title} /></Link>
                                    </div>
                                    <div className="info">
                                        <div className="number"><span>{`0${i += 1}.`}</span></div>
                                        <div className="newsTitle">
                                            <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}/${item.id}`}>{item.title.length > 66 ? `${item.title.slice(0, 66)}...` : `${item.title}`}</Link>
                                        </div>
                                        <div>
                                            <div className="category">
                                                <Link href={`/${item.subCatUrl ? item.subCatUrl : item.catUrl}`}>{item.sub_category}</Link>
                                            </div>
                                            <div className="date">
                                                <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div></SwiperSlide>)
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    )
}