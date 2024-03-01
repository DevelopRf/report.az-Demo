'use client'
import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/Hooks/Hook"

const Footer = () => {
    const { dark } = useAppContext()

    return (
        <footer>
            <div className={styles.footerTop}>
                <div className="container">
                    <div className="row">
                        <div className="col p-x">
                            <div className={styles.wrapper}>
                                <div className={styles.logo}>
                                    <Link href={'/'}><Image src={dark ? "https://report.az/public/images/logo-light-az.png" : "https://report.az/public/images/logo-dark-az.png"} width={150} height={35} alt="report.az logo" /></Link>
                                </div>
                                <nav className={styles.navbar}>
                                    <ul>
                                        <li><Link href="#">Vakansiyalar</Link></li>
                                        <li><Link href="#">Haqqımızda</Link></li>
                                        <li><Link href="#">Bizimlə əlaqə</Link></li>
                                        <li><Link href="#">Abunə</Link></li>
                                    </ul>
                                    <ul>
                                        <li><Link href="/siyaset">Siyasət</Link></li>
                                        <li><Link href="/iqtisadiyyat">İqtisadiyyat</Link></li>
                                        <li><Link href="/cop29">COP29</Link></li>
                                        <li><Link href="/cemiyyet">Cəmiyyət</Link></li>
                                        <li><Link href="/idman">İdman</Link></li>
                                        <li><Link href="/medeniyyet">Mədəniyyət</Link></li>
                                        <li><Link href="/dunya">Dünya</Link></li>
                                        <li><Link href="/analitika">Analitika</Link></li>
                                        <li><Link href="/multimedia">Multimedia</Link></li>
                                    </ul>
                                </nav>
                                <div className={styles.pattern} style={dark ? {backgroundImage: 'url(https://report.az/public/images/divider-bg-light.svg)'}: {backgroundImage: 'url(https://report.az/public/images/divider-bg-dark.svg)'}}>

                                </div>
                                <div className={styles.copyrightWrapper}>
                                    <div className={styles.copyrights}>
                                        <p>Saytdakı materialların istifadəsi zamanı istinad edilməsi vacibdir. Məlumat internet səhifələrində istifadə edildikdə hiperlink vasitəsi ilə istinad mütləqdir.</p>
                                    </div>
                                    <ul className={styles.socialNetwork}>
                                        <li><Link href="#"><i className="icon-mobile"></i></Link></li>
                                        <li><Link href="https://www.facebook.com/www.report.az/"><i className="icon-facebook"></i></Link></li>
                                        <li><Link href="https://www.instagram.com/report.az/"><i className="icon-instagram"></i></Link></li>
                                        <li><Link href="https://t.me/reportnewsaz"><i className="icon-telegram"></i></Link></li>
                                        <li><Link href="https://twitter.com/reportnewsaz"><i className="icon-twitter"></i></Link></li>
                                        <li><Link href="https://www.linkedin.com/company/report-news-agency"><i className="icon-linkedin"></i></Link></li>
                                        <li><Link href="https://www.youtube.com/channel/UCPSpgPJwGhr5uB0Uui8Lj8g"><i className="icon-youtube-play"></i></Link></li>
                                        <li><Link href="https://report.az/rss/"><i className="icon-rss"></i></Link></li>
                                        <li><Link href="#"><i className="icon-podcast"></i></Link></li>
                                        <li><Link href="#"><i className="icon-podcast"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className="container">
                    <div className="row">
                        <div className="col p-x">
                            <p>"Report" müstəqil informasiya agentliyi sayt və gündəlik bülletenlər vasitəsi ilə Azərbaycan, rus və ingilis dillərində siyasət, iqtisadiyyat, cəmiyyət, idman, mədəniyyət sahələri üzrə ölkədə və dünyada baş verən ən vacib hadisələri öz oxucularına operativ şəkildə çatdırır. O cümlədən, saytın “Analitika” bölməsində Azərbaycanda və dünyada gedən proseslərlə bağlı analitik materiallar təqdim edilir.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer