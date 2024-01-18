import styles from "./VideoSlider.module.scss"
import localFont from "next/font/local"

const MontserratExtraBold = localFont({src: '../../fonts/Montserrat-ExtraBold.woff2'})

const VideoSlider = () => {
    return (
        <div className={styles.videoNews}>
            <div className={`${styles.title} ${MontserratExtraBold.className}`}>
                <h2>Video xəbərlər</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.videoItem}>
                        <iframe width="560" height="225" src="https://www.youtube.com/embed/7dfKrPoIFlE?si=IlawNIkxDb7mOcyN" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <ul className={styles.pagination}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default VideoSlider