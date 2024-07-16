import css from "../ticket.module.css";
import Image from "next/image";
import {EXCLAMATION_ICON_BLACK} from "spix.local.icons";
import {usePreviewContext} from "../../../";

export default function MinTickets({min}:{min: number}){
    return(
        <p className={css.ad}>
            <div className={css.icon}><Image layout={"fill"} src={EXCLAMATION_ICON_BLACK}/></div>
            <span> Minimo {min} tickets</span>
        </p>
    )
}