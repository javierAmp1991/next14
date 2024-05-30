//@ts-ignore
import style from "./tabs-sections-control.module.css";
import {CSSProperties, useLayoutEffect, useRef, useState} from "react";
import {NavTabsProps} from "../tabs-sections-control-props";
import { NavItemMobile } from "./nav-item-mobile";

export const NavTabsMobile = ({item, onClick}:{ item: NavTabsProps[], onClick?: Function }) => {
    const [position, setPosition] = useState({
        Position: 0,
        Width: 143
    });
    const n: CSSProperties = {width: position.Width, transform: `translateX(${position.Position}px)`};
    const refParent = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        item.forEach(e => {
            if (e.State) {
                const p = document.getElementById(e.Id);
                const containerRect = refParent.current!.getBoundingClientRect();
                const pRect = p!.getBoundingClientRect();
                const newPosition = pRect.left - containerRect.left + refParent.current!.scrollLeft;
                refParent.current!.scrollLeft = newPosition
                setPosition({
                    Position: newPosition,
                    Width: p!.offsetWidth
                })
            }
        })
    }, [item])

    return (
        <div className={style.mainGrid}>
            <div className={style.gridOut}>
                <div className={style.empty}/>
                <div ref={refParent} className={style.grid}>
                    {item.map(e => e.IsAvailable && <NavItemMobile props={e} handleClick={onClick}/>)}
                    <div style={n}className={style.line}/>
                </div>
                <div className={style.empty}/>
            </div>
        </div>
    )
}