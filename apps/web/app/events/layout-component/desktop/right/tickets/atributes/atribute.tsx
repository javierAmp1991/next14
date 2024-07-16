import Image from "next/image";
import {Atributes} from "../../../../index";
import {useState} from "react";
import style from "./atributes.module.css";
import {CHECK_ICON_GREEN} from "@repo/ui/localIcons";


export default function Atribute({prop}: { prop: Atributes }) {
    const [display, setDisplay] = useState(false)
    return (
        <div className={style.contAtr}>
            <Image alt="" style={{cursor: "help"}} onMouseOver={handleOver} onMouseLeave={handleOut} width={13} height={13}
                   src={prop.Icon || CHECK_ICON_GREEN}/>
            {prop.Name}
            {(display && prop.Description) && <div className={style.contText}>{prop.Description}</div>}
        </div>
    )

    function handleOver() {
        setDisplay(true)
    }

    function handleOut() {
        setDisplay(false)
    }
}