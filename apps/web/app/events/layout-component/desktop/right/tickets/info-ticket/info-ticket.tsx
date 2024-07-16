import style from "./info-ticket.module.css";
import utilities from "@repo/ui/misc";
import TicketComp from "./ticket/ticket";
import {useLayoutContext} from "../../../../index";

export default function InfoTicket() {
    const {Tickets} = useLayoutContext();
        
    return (
        <div className={`${style.main}`}>
            <div className={utilities.subtitle}>Resumen de la compra</div>
            {Tickets.map(e=>e.State && <TicketComp prop={e}/>)}
        </div>
    )
}