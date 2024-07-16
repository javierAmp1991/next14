import style from "./info.module.css";
import utilities from "@repo/ui/misc";
import UpOrDownTickets from "./up-or-down-tickets";

export default function SectionInfo() {
    return (
        <div className={`${style.main}`}>
            <div className={style.contInfo}>
                <p className={utilities.subtitle}>Seccion Norte</p>
                <p className={style.price}>Cantidad de entradas</p>
            </div>

            <UpOrDownTickets/>
        </div>

    )


}