//@ts-ignore
import style from "./style.module.css";
import React, { useEffect, useState } from "react";


export const DesplegableContainer = ({s, children}:{s: boolean, children: React.ReactNode})=>{
    const [state, setState] = useState(false);
    useEffect(()=>{
    let timeoutId: NodeJS.Timeout;
    if(s) setState(true)
    else timeoutId = setTimeout(() => setState(false), 3000);
    return () => {
        if (timeoutId) clearTimeout(timeoutId);
    };
    }, [s])
    return(
        <div className={`${style.main} ${s && style.show}`}>
            {state && children}
        </div>
    )    
}