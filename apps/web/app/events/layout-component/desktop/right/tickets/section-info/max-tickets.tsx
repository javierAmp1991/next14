import css from "../ticket.module.css";
import Image from "next/image";
import {EXCLAMATION_ICON_BLACK} from "spix.local.icons";
import {usePreviewContext} from "../../../";

export default function MaxTickets({max}:{max?: number | undefined}){
    const {MaxTickets} = usePreviewContext();
    const maxTicket = max ? max : MaxTickets
    return(
        <p className={css.ad}>
            <div className={css.icon}><Image layout={"fill"} src={EXCLAMATION_ICON_BLACK}/></div>
            <span> Maximo {maxTicket} tickets</span>
        </p>
    )
}