import Link from "next/link"
import styles from "./LatestNews.module.scss"
import { getNews } from "@/app/libs/newsData.js"
import localFont from "next/font/local"

const MontserratExtraBold = localFont({src: '../../fonts/Montserrat-ExtraBold.woff2'})

const LatestNews = async () => {

    const news = await getNews()
    console.log(news)
    // console.log(news);
    // news.slice(0,1).map((item)=>{
    //    console.log( item.key)    
    // })
    /*  const convertDateUTC = (date)=>{
         const months = [
             "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
             "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
         ];
 
         const d = new Date(date)
         const day = d.getUTCDay()
         const month = months[d.getUTCMonth()]
         const year = d.getUTCFullYear()
 
         return `${day} ${month}, ${year}`
 
     } */

    const convertTimeUTC = (timeEntered) => {
        const d = new Date(timeEntered)
        const hour = d.getUTCHours()
        const minute = d.getUTCMinutes()

        return `${hour}: ${minute}`
    }


    // return (
        // <section className={styles.latestNews}>
        //     <div className={styles.wrapper}>
        //         <div className={`${styles.title} ${MontserratExtraBold.className}`}>
        //             <h2><Link href="#">Son xəbərlər</Link></h2>
        //         </div>
        //         <div className={styles.contentWrapper}>
        //         {
        //             news && news.slice(0, 20).map(item => {
        //                 return (
        //                     <div key={item.id} className={styles.content}>
        //                         <div className={styles.time}>
        //                             <span>{convertTimeUTC(item.date)}</span>
        //                         </div>
        //                         <div className={styles.info}>
        //                             <div className={styles.newsTitle}>
        //                                 <Link href="#">{item.title}</Link>
        //                             </div>
        //                             <div className={styles.category}>
        //                                 <Link href="#">{item.subcategory}</Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 )
        //             })
        //         }
        //         </div>
        //     </div>
        // </section>
    // )
}

export default LatestNews