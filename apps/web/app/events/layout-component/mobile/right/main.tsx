import style from "../style.module.css";
import css from "./style.module.css";
import Sections from "./sections/sections";
import {IMainButton} from "@repo/ui/mainButton";
import {useLayoutContext} from "../../index";
import Tickets from "./tickets/main";
import {useEffect, useRef, useState} from "react";
import u, {DesplegableContainerPortal, IDesplegableContainerPortal} from "@repo/ui/misc";
import Areas from "../left/main";
import Image from "next/image";
import {FILTER_ICON_BLUE} from "@repo/ui/localIcons";

export default function Main(){
    const {Tickets: T, IsPublic} = useLayoutContext();
    const [showTickets, setShowTickets] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const contRef = useRef<HTMLDivElement>(null);
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
    const desplegableProps: IDesplegableContainerPortal = {
        State: showFilters,
        OnClose: handleFilters
    };

    useEffect(()=>{
        setShowTickets(hasTicketSelected)
        {/*if(!showTickets && contRef.current && !isFirstLoad){
            contRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }*/}
    }, [T])

    /*useEffect(()=>{
        setIsFirstLoad(false)
    },[])*/

    return(
        <>
        <div ref={contRef} className={style.right}>
            {
                showTickets ?
                <Tickets onReturn={handleHideTickets} areAllSame={areAllSame}/>
                :
                <>
                    <div className={`${css.gridTabs} ${IsPublic && css.gridTabsPublic}`}>
                        {
                            IsPublic ?
                            <>
                            <button onClick={handleStandart} className={`${sBase} ${state && sSelected}`}>
                                Estandar
                            </button>
                            <button onClick={handleResale} className={`${sBase} ${!state && sSelected}`}>
                                 Reventa
                            </button>
                            </>
                            :
                            <button className={sBase}>
                                Secciones
                            </button>                            
                        }
                        <button className={css.filterCont} onClick={handleFilters}>
                            <Image className={css.iconFilter} width={16} height={16} alt="" src={FILTER_ICON_BLUE}/>
                        </button>
                        {IsPublic && <div className={`${css.line} ${state && css.lineResale}`}/>}
                    </div>
                    <Sections/>
                </>
            }
        </div>

        <DesplegableContainerPortal props={desplegableProps}>
            <Areas/>
        </DesplegableContainerPortal>
        </>
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

    function handleFilters(){
        setShowFilters(!showFilters)
    }
}