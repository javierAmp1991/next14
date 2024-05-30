//@ts-ignore
import style from "./filters.module.css";
import {HeaderColumNumericRange} from "../props";
import {useEffect, useRef, useState} from "react";
import {Tooltip} from "./tooltip";

export const PLACEHOLDER_FROM = "$ Desde:";
export const PLACEHOLDER_TO = "$ Hasta:";

export default function NumRange({props, isSelected}: { props: any, isSelected: boolean }) {
    const item = props as HeaderColumNumericRange;
    const refFrom = useRef<HTMLInputElement>(null);
    const refTo = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen])
    useEffect(() => {
        if (!isSelected) {
            refFrom.current!.value = ""
            refTo.current!.value = ""
        }
    }, [isSelected])
    return (
        <div ref={selectRef} className={style.containerFilter}>
            <button onClick={handleToggle} className={style.grid}>
                <span className={style.text}>{item.Name}</span>
                {
                    isOpen || isSelected ?
                        <>
                            {
                                item.IsCurrency ?
                                    <b>$</b>
                                    :
                                    <div className={style.contRange}>
                                        <div className={style.range}/>
                                    </div>
                            }
                        </>
                        :
                        <div className={style.disable}/>
                }
            </button>
            <Tooltip isOpen={isOpen}>
                <div className={style.gridRange}>
                    <input className={style.input} ref={refFrom} type="number" placeholder={PLACEHOLDER_FROM}/>
                    <input className={style.input} ref={refTo} type="number" placeholder={PLACEHOLDER_TO}/>
                    <button onClick={handleSend} className={style.send}>
                        <div className={style.sendIcon}/>
                    </button>
                </div>
            </Tooltip>
        </div>

    )

    function handleSend() {
        item.HandleFilter(item.Name, refFrom.current!.valueAsNumber, refTo.current!.valueAsNumber)
        handleToggle()
    }

    function handleToggle() {
        setIsOpen(!isOpen)
    }
}