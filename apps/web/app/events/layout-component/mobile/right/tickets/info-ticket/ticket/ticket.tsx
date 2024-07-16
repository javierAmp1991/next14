import {Ticket, EnumTypeSection, EnumTypeTicket, useLayoutContext} from "../../../../../index";
import style from "./ticket.module.css";
import u from "@repo/ui/misc";
import { useState } from "react";

export default function TicketComp({prop}: { prop: Ticket }) {
    const{TicketHandlers} = useLayoutContext();
    const {DeleteTicket} = TicketHandlers;
    const [Del, setDel] = useState(false)
    const details = getDetails();

    return (
        <>
            <div className={style.mainGrid} onMouseOver={handleOver} onMouseLeave={handleOut}>
                <div className={style.dec}/>
                <div className={style.dash}/>
                <div className={style.contDash}>
                    <div className={style.main}>
                        <div className={style.gridTop}>
                            <div className={style.contLeft}>
                                <div className={style.pre}>{details.SectionTitle}</div>
                                <b>{details.Section}</b>
                            </div>
                            <div className={style.contPre}>
                                <div className={style.pre}>{details.RowTitle}</div>
                                <b>{details.Row}</b>
                            </div>
                            {
                                (details.SeatTitle !== "" && details.Seat !== "") &&
                                <div className={style.contRight}>
                                    <div className={style.pre}>{details.SeatTitle}</div>
                                    <b>{details.Seat}</b>
                                </div>
                            }
                        </div>
                        <div className={`${style.gridBottom} ${style.gridBottomTable}`}>
                            {details.Type}: ${prop.Price}
                        </div>
                        {/*
                            prop.Products && <div className={style.contProducts}>
                                <button style={{fontSize: 13}} onClick={handlePopUp} className={`${u.link} ${u.linkLeft}`}>
                                    {prop.Products.length} {prop.Products.length === 1 ? "Producto incluido" : "Productos incluidos"}
                                </button>
                            </div>
                        */}

                    </div>
                    {
                        Del && <div className={style.contDelete}>
                            <button onClick={handleDeleteTicket} className={style.close}/>
                        </div>
                    }
                </div>
            </div>
        </>
    )

    function getDetails() {
        let typeTicket = "Ticket Estandar";
        if (prop.Type === EnumTypeTicket.Resale) typeTicket = "Ticket en reventa";

        let rowTitle = ""
        let seatTitle = ""
        let row = ""
        let seat = ""

        if (prop.TypeSection === EnumTypeSection.Object) {
            rowTitle = "Sillones";
            row = `${prop.File}`;
        } else if (prop.TypeSection === EnumTypeSection.Row) {
            rowTitle = "Fila";
            seatTitle = "Asiento";
            row = prop.File;
            seat = `${prop.Seat}`;
        } else if (prop.TypeSection === EnumTypeSection.Table) {
            rowTitle = "Mesa";
            seatTitle = prop.IsShared ? "Silla" : "";
            row = prop.File;
            seat = prop.IsShared ? `${prop.Seat}` : "";
        } else {
            row = "S / E"
        }

        return {
            Type: typeTicket,
            SectionTitle: "Seccion",
            Section: prop.SectionName,
            RowTitle: rowTitle,
            SeatTitle: seatTitle,
            Row: row,
            Seat: seat
        }
    }

    function handleDeleteTicket() {
        DeleteTicket(prop)
    }

    function handleOver() {
        setDel(true)
    }

    function handleOut() {
        setDel(false)
    }
}