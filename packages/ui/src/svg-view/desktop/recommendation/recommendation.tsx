//@ts-ignore
import style from "./recommendation.module.css";
import {useEffect, useState} from "react";
import {CURSOR_ICON_WHITE, GRAB_ICON_WHITE, ZOOM_IN_OUT} from "../../../icons";
import Image from "next/image";

const size = 28;

export default function Recommendation() {
    const [state, setState] = useState(true);
    const options = [
        {
            Image: ZOOM_IN_OUT,
            Text: "Acercate o alejate dentro del mapa",
            Available: true
        },
        {
            Image: GRAB_ICON_WHITE,
            Text: "Arrastra el mapa para moverlo",
            Available: true
        },
        {
            Image: CURSOR_ICON_WHITE,
            Text: "Haz click para seleccionar una seccion",
            Available: true
        }
    ];

    useEffect(() => {
        setTimeout(() => setState(false), 5000)
    }, [])

    return (
        state ?
            <div className={style.main}>
                <div className={style.gridHeader}>
                    <b className={style.title}>Se puede interactuar con el mapa</b>
                    <button onClick={handleClose} className={style.close}/>
                </div>

                <div className={style.grid}>
                    {options.map(e => e.Available &&
                        <div className={style.option}>
                            <Image alt="" width={size} height={size} src={e.Image}/> {e.Text}
                        </div>)}
                </div>
            </div>
            :
            <></>
    )

    function handleClose() {
        setState(false)
    }
}