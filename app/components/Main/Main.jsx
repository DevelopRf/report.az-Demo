import styles from "./Main.module.scss"
import Link from 'next/link';
import localFont from "next/font/local"
import LatestNews from "../LatestNews/LatestNews";
import VideoSlider from '../VideoSlider/VideoSlider';
import SliderMain from "../Slider/SliderMain";
import { UrgentNews } from "../UrgentNews/UrgentNews";
import ActualNews from "../ActualNews/ActualNews";
import { ImportantNews } from "../ImportantNews/ImportantNews";
import OtherCategories from "../OtherCategories/OtherCategories";
const montserratBold = localFont({ src: '../../fonts/Montserrat-Bold.woff2' })

export default async function Main({ data }) {

    const slider = data.filter(item => item.slider)
    const urgentNews = data.filter(item => item.urgent)
    const importantNews = data.filter(item => item.important)
    const filterActual = data.filter(item => item.type === "Aktual")
    const politic = data.filter(item => item.category === "Siyasət")
    const economy = data.filter(item => item.category === "İqtisadiyyat")
    const cop29 = data.filter(item => item.category === "COP29")
    const society = data.filter(item => item.category === "Cəmiyyət")
    const sport = data.filter(item => item.category === "İdman")
    const culture = data.filter(item => item.category === "Mədəniyyət")

    return (
        <main>
            <section className={styles.mainSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <SliderMain news={slider} />
                            <div className={styles.filterLink}>
                                <div className={`${styles.btn} ${montserratBold.className}`}>
                                    <Link href="#">PREZİDENT SEÇKİLƏRİ - 2024</Link>
                                </div>
                            </div>
                            <UrgentNews news={urgentNews} />
                            <ActualNews news={filterActual} />
                            <ImportantNews news={importantNews} />
                        </div>
                        <div className="col-lg-4">
                            <VideoSlider />
                            <LatestNews news={data} />
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.otherCategories}>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>SİYASƏT</h2></Link></div>
                            <OtherCategories news={politic} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>İQTİSADİYYAT</h2></Link></div>
                            <OtherCategories news={economy} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>COP 29</h2></Link></div>
                            <OtherCategories news={cop29} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>CƏMİYYƏT</h2></Link></div>
                            <OtherCategories news={society} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>İDMAN</h2></Link></div>
                            <OtherCategories news={sport} />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.title}><Link href="#"><h2>MƏDƏNİYYƏT</h2></Link></div>
                            <OtherCategories news={culture} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
