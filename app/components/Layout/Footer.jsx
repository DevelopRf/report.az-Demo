import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"

const Footer = ()=>{
    return (
        <footer>
            <div className={styles.footerTop}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={styles.logo}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}></div>
        </footer>
    )
}

export default Footer