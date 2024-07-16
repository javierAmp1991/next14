import style from "./style.module.css";
import utilities, {IImageComponent, ImageComponent, RatingStars} from "@repo/ui/misc";
import {useState} from "react";
import {useLayoutContext} from "../../";


export default function Banner() {
    const {Event} = useLayoutContext();
    const Venue = "Casa Plateada"
    const [display, setDisplay] = useState(false);
    const bannerProps: IImageComponent = {
        Src: Event?.Banner!,
        Style: style.bannerImage
    };
    const bannerDespProps: IImageComponent = {
        Src: "/venue-images/test2.jpg",
        Style: `${style.bannerOpen} ${display && style.open}`
    }
    return (
        <>
            <div className={style.banner}>
                <div className={`${display && style.selected}`} onMouseOver={handleOver} onMouseLeave={handleOut}>
                    <ImageComponent props={bannerProps}/>
                </div>

                <div className={style.mainInfo}>
                    <div className={style.info}>
                        <div title={Event?.Title} className={`${utilities.subtitle} ${utilities.clamp1}`}>
                            {Event?.Title}
                        </div>
                        <RatingStars prop={{Rating: 5, RatingCount: 100, UseTiny: true}}/>
                    </div>
                    <p className={style.venue} title={`${Venue} de 14:00hrs a 15:00hrs`}>
                        <span>{Venue} </span>
                        <span>de 14:00 hrs </span>
                        <span>a 15:00 hrs</span>
                    </p>
                </div>


            </div>
            {display && <div className={style.blackScreen}/>}
            <ImageComponent props={bannerDespProps}/>
        </>
    )

    function handleOver() {
        setDisplay(true)
    }

    function handleOut() {
        setDisplay(false)
    }
}