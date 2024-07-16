//@ts-ignore
import style from "./style.module.css";
import {ReactNode, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {RIGHT_ARROW_BLACK, RIGHT_ARROW_BLU} from "../../icons";

export interface IDropDownContainer {
    Title: string
    InitialState?: boolean
    IsObligatory?: boolean
    IsActive?: boolean
    Size?: "Xl" | "L" | "S",
    Style?: string
    Icon?: string
    UseSpaceArrow?: boolean
    UseLinkColor?: boolean
    Optional?: string
    UseChildrenGrid?: boolean
}

export const DropDownContainer = ({props, children}: { props: IDropDownContainer, children: ReactNode }) => {
    const isObligatory: boolean = props.IsObligatory || false;
    const isActive: boolean = props.IsActive || true;
    const initialState: boolean = props.InitialState || true;
    const icon: string = props.Icon ? props.Icon : props.UseLinkColor ? RIGHT_ARROW_BLU : RIGHT_ARROW_BLACK;
    const [state, setState] = useState<boolean>(initialState);
    const contRef = useRef<HTMLDivElement>(null);
    const title: string = getSize()!;
    const styleTitleArrow = props.UseSpaceArrow ? style.gridTitleArrowSpace : style.gridTitleArrow;

    useEffect(() => {
        if (contRef.current && !state && isActive) {
            contRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, [state])

    return (
        <div ref={contRef} className={`${style.main} ${props.Size === "S" ? style.gapMini : style.gap} 
        ${props.Style}`}>
            <div onClick={handleState} className={styleTitleArrow}>
                <div className={`${props.UseLinkColor && style.linkColor} ${props.Style}`}>
                    {isObligatory && <span style={{color: "red"}}>* </span>}
                    <span className={`${title}`}>{props.Title}</span>
                    {props.Optional && <span className={style.optional}> ({props.Optional})</span>}
                </div>
                <div className={`${style.arrow} ${state ? style.rotate0 : style.rotate90}`}>
                    <Image alt="" layout={"fill"} src={icon}/>
                </div>
            </div>
            {!state && <div className={`${props.UseChildrenGrid && style.grid}`}>{children}</div>}
        </div>
    )

    function handleState() {
        setState(!state)
    }

    function getSize(): string {
        if (props.Size === undefined) return `${style.titleM}`
        else if (props.Size === "Xl") return `${style.titleXl}`
        else if (props.Size === "L") return `${style.titleL}`
        else return `${style.titleM}`
    }
}