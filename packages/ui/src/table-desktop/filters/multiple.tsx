//@ts-ignore
import style from "./filters.module.css";
import {HeaderColumMultiple} from "../props";
import {useEffect, useRef, useState} from "react";
import {Tooltip} from "./tooltip";

export default function Multiple({props, isSelected}: { props: any, isSelected: boolean }) {
    const item = props as HeaderColumMultiple;
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
    }, [isOpen]);

    return (
        <div ref={selectRef} className={style.containerFilter}>
            <button onClick={handleOpen} className={style.grid}>
                <span className={style.text}>{item.Name}</span>
                {
                    isSelected || isOpen ?
                        <div className={style.multi}/>
                        :
                        <div className={style.disable}/>
                }
            </button>
            <Tooltip isOpen={isOpen}>
                {item.Options.map(e =>
                    <div className={style.gridOptions} key={e.Name}>
                        <span>{e.Name}</span>
                        <input type="radio" checked={isSelected ? e.State : false}
                               onChange={() => handleOption(e.Name)}/>
                    </div>
                )}
            </Tooltip>
        </div>
    )

    function handleOption(option: string) {
        item.HandleFilter(option)
        handleOpen()
    }

    function handleOpen() {
        setIsOpen(!isOpen)
    }
}