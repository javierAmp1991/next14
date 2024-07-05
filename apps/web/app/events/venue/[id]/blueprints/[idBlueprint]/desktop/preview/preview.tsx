import {SvgViewDesktop, SvgViewProps} from "@repo/ui/svgView";
import style from "./style.module.css";
import { useState } from "react";

export default function Preview(){
    const [s, setS] = useState<string | undefined>(undefined)
    const props: SvgViewProps = {
        Src: "/venue-images/firstPlace.svg",
        GoTo: s
    }
    return(
        <div className={style.main}>
            <div onClick={goTo}>Algo</div>
            <SvgViewDesktop props={props}/>
            <div>algo mas</div>
        </div>
    )

    function goTo(){
        if(s === undefined) setS(`[section-name="Seccion Oeste"]`)
        else setS(undefined)
    }
}