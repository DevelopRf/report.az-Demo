import styles from "./Main.module.scss"
import Link from 'next/link';
import localFont from "next/font/local"
import Slider from '../Slider/SliderMain';
import LatestNews from "../LatestNews/LatestNews";
import VideoSlider from '../VideoSlider/VideoSlider';
import SliderMain from "../Slider/SliderMain";


const montserratBold = localFont({ src: '../../fonts/Montserrat-Bold.woff2' })

export default function Main() {
    return (
        <main>
            <section className={styles.mainSection}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <SliderMain />
                            <div className={styles.filterLinks}>
                                <div className={`${styles.btn} ${montserratBold.className}`}>
                                    <Link href="#">PREZİDENT SEÇKİLƏRİ - 2024</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <VideoSlider />
                            <LatestNews />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
