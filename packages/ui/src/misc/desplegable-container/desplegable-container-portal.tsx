//@ts-ignore
import style from "./style.module.css";
import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import {ID_PORTAL} from "../../const";

export interface IDesplegableContainerPortal{
    State: boolean
    OnClose: Function
}


export const DesplegableContainerPortal = ({props, children}:{props: IDesplegableContainerPortal, children: React.ReactNode})=>{
    const [state, setState] = useState(false);
    const {OnClose, State} = props;
    useEffect(()=>{
        let timeoutId: NodeJS.Timeout;
        if(State) setState(true)
        else timeoutId = setTimeout(() => setState(false), 3000);
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [State])
    
    return(
        createPortal(
            <div className={`${style.mainFromBottom} ${State && style.show}`}>
                {
                    state && 
                    <>
                        <div onClick={handleClose} className={style.blackScreen}/>
                        <div className={style.mainContainer}>{children}</div>
                    </>
                }
            </div>, document.getElementById(ID_PORTAL)!
        )
    )
    
    function handleClose(){
        OnClose()
    }
}