//@ts-ignore
import style from "./filters.module.css";
import {HeaderColumNumericRange} from "../props";
import { FilterContainer } from "./filter-container";
import {useEffect, useRef} from "react";
import {PLACEHOLDER_FROM, PLACEHOLDER_TO} from "../const";

export const NumRange = ({props, isSelected}: { props: any, isSelected: boolean }) => {
    const item = props as HeaderColumNumericRange;
    const refFrom = useRef<HTMLInputElement>(null);
    const refTo = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!isSelected) {
            refFrom.current!.value = ""
            refTo.current!.value = ""
        }
    }, [isSelected])
    return (
        <FilterContainer name={item.Name} type={item.Type!} isCurrency={true}>
            <div className={style.gridRange}>
                <input className={style.input} ref={refFrom} type="number" placeholder={PLACEHOLDER_FROM}/>
                <input className={style.input} ref={refTo} type="number" placeholder={PLACEHOLDER_TO}/>
                <div onClick={handleSend} className={style.send}>
                    <div className={style.sendIcon}/>
                </div>
            </div>
        </FilterContainer>
    )

    function handleSend() {
        item.HandleFilter(refFrom.current!.valueAsNumber, refTo.current!.valueAsNumber)
    }
}