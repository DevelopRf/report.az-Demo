'use client'
import { useState, useRef } from "react";

const NotFound = () =>{
    const [shadowX, setShadowX] = useState(null)
    const [shadowY, setShadowY] = useState(null)
    const boxelement = useRef(null)

    const move = (e) => {
        let widthX = window.innerWidth / 2
        let widthY = window.innerHeight / 2
        setShadowX(Math.floor(-1 * (e.clientX - widthX) * 100 / boxelement.current.clientWidth / 2))
        setShadowY(Math.floor(-1 * (e.clientY - widthY) * 100 / boxelement.current.clientHeight / 2))
    }

    return (
        <section className="notFound">
            <div className="container" onMouseMove={move} ref={boxelement}>
                <div className="row">
                    <div className="col-12">
                        <div className="wrapper">
                            <div className="box">
                                <h1 style={{textShadow: `#35353540 ${shadowX}px ${shadowY}px 6px`}}>404</h1>
                                <h2>Axtardığınız səhifə tapılmadı</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound