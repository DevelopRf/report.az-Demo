'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "./OtherCategories.module.scss"
import { useAppContext } from "@/app/Hooks/Hook"
import { useEffect } from "react"
import { convertDateUTC, convertTimeUTC } from "@/app/libs/date"

const OtherCategories = ({ news }) => {
    const {dark} = useAppContext()
    useEffect(()=>{
console.log("isledi");
    }, [dark])
    return (
        <div className={styles.newsCards}>
                {
                    news && news.slice(0, 1).map(item => {
                        return (
                            <div className={styles.bigNewsCard} key={item.id}>
                                <div className={styles.image}>
                                    <Link href={`/${item.subCatUrl}/${item.id}`}><Image src={item.img} width={400} height={250} alt={item.title} /></Link>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.newsTitle}>
                                        <Link href={`/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title}{item.paid_info && <span className="iconLock"></span>}</Link>
                                    </div>
                                    <div className={styles.date}>
                                        <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={styles.smallCards}>

                    {
                        news && news.slice(1, 3).map(item => {
                            return (
                                <div className={styles.newsCard} key={item.id}>
                                    <div className={styles.image}>
                                        <Link href={`/${item.subCatUrl}/${item.id}`}><Image src={item.img} width={400} height={250} alt={item.title} /></Link>
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.newsTitle}>
                                            <Link href={`/${item.subCatUrl}/${item.id}`}>{item.photo && <span className="type">FOTO</span>}{item.video && <span className="type">VİDEO</span>}{item.title.length > 75 ? `${item.title.slice(0, 75)}...` : `${item.title}`}{item.paid_info && <span className="iconLock"></span>}</Link>
                                        </div>
                                        <div className={styles.date}>
                                            <span>{convertDateUTC(item.date)} <span>&#x2B1D;</span> {convertTimeUTC(item.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}

export default OtherCategories