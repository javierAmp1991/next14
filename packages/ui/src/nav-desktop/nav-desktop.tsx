import Main from "./main-side/main";
import {usePathname} from "next/navigation";
import {NavProps} from "./nav-desktop-props";
import React, { useState } from "react";
//@ts-ignore
import style from "./style.module.css";



export const NavDesktop = ({children, props, link}: {children: React.ReactNode, props: NavProps, link: string }) =>{
    const [isOpen, setIsOpen] = useState(true);
    const name = usePathname();
    
    return <div className={`${style.main} ${!isOpen && style.mainShort}`}>
        <Main onGrid={handleGrid} isOpen={isOpen} options={props.SectionOptions} title={props.Title} link={link}/>
        {children}
    </div>

    function handleGrid() {
        setIsOpen(!isOpen)
    }
}