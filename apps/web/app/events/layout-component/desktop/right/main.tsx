import style from "../style.module.css";
import css from "./style.module.css";
import Sections from "./sections/sections";
import {IMainButton, MainButton} from "@repo/ui/mainButton";
import {useLayoutContext} from "../../index";
import Tickets from "./tickets/main";
import {useEffect, useState} from "react";
import u, {DesplegableContainer} from "@repo/ui/misc";

export default function Main(){
    const {Tickets: T} = useLayoutContext();
    const [showTickets, setShowTickets] = useState(false);
    const [state, setState] = useState(false);
    const sBase = `${css.tabs} ${u.subtitle}`;
    const sSelected = `${css.tabSelected}`;
    const ticketsSelected = T.filter(t=>t.State);
    const hasTicketSelected = ticketsSelected.length > 0;
    const areAllSame = ticketsSelected.length === 0 ? false : ticketsSelected.every(elemento => elemento.SectionName === ticketsSelected[0]!.SectionName)
    const buttonProps: IMainButton = {
        Text: "Continuar compra",
        OnClick: toggle,
        UseTiny: true
    };

    useEffect(()=>{
        setShowTickets(hasTicketSelected)
    }, [T])
    return(
        <div className={style.right}>
            <div className={style.mainTabs}>
                <div className={css.gridTabs}>
                    <button onClick={handleStandart} className={`${sBase} ${state && sSelected}`}>
                        Estandar
                    </button>
                    <button onClick={handleResale} className={`${sBase} ${!state && sSelected}`}>
                        Reventa
                    </button>
                    <div className={`${css.line} ${state && css.lineResale}`}/>
                </div>

                <div className={style.left}>
                    <Sections/>
                </div>

                <DesplegableContainer s={showTickets && hasTicketSelected}>
                    <Tickets onReturn={handleHideTickets} areAllSame={areAllSame}/>
                </DesplegableContainer>
            </div>

            <div className={u.defaultContainerButtons}>
                <MainButton props={buttonProps}/>
            </div>
        </div>
    )

    function handleStandart(){
        setState(false)
    }

    function handleResale(){
        setState(true)
    }

    function handleHideTickets(){
        setShowTickets(false)
    }

    function handleShowTickets(){
        setShowTickets(true)
    }

    function toggle(){
        setShowTickets(!showTickets)
    }
}