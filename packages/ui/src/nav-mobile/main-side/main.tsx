//@ts-ignore
import style from "./main.module.css";
import {CSSProperties, useLayoutEffect, useRef, useState} from "react";
import NavItem from "../nav-items-side/nav-item";
import Image from "next/image";
import {NavOptionsProps} from "../../nav-desktop";
import Link from "next/link";

const defaultTooltip = {
    State: false,
    PositionX: 0,
    PositionY: 0
};
const defaultContract = {
    Top: 0,
    Right: 0,
    Visible: false
};
const defaultScroll = {
    IsVisible: false,
    State: false
};
const defaultPosition = 0;
const returnText = "Volver";

export default function Main({options, title, isOpen, onGrid, link} : 
    {options: NavOptionsProps[], title: string, isOpen: boolean, onGrid: ()=>void, link: string}) {
    const [position, setPosition] = useState(defaultPosition);
    const [contract, setContract] = useState(defaultContract);
    const [scroll, setScroll] = useState(defaultScroll);
    const [tooltip, setTooltip] = useState(defaultTooltip);
    const refCont = useRef<HTMLDivElement>(null)
    const refParent = useRef<HTMLDivElement>(null);
    const refTooltip = useRef<HTMLButtonElement>(null);
    const t: CSSProperties = {transform: `translateY(${position}px)`};

    useLayoutEffect(() => {
        options.forEach((item: NavOptionsProps) => {
            if (item.UrlKey === link) {
                const p = document.getElementById(item.Id);
                const containerRect = refParent.current!.getBoundingClientRect();
                const pRect = p!.getBoundingClientRect();
                const newPosition = pRect.top - containerRect.top + refParent.current!.scrollTop;
                refParent.current!.scrollTop = newPosition
                setPosition(newPosition)
            }
        })
    }, [link])

    useLayoutEffect(() => {
        if (refCont.current) {
            const div = refCont.current.getBoundingClientRect();
            const width = isOpen ? 260 : 100;
            const right = div.left + width - 14;
            const top = div.top + (div.height / 2) - 12;
            setContract({...contract, Right: right, Visible: true, Top: top})
        }
    }, [isOpen])

    useLayoutEffect(() => {
        if (refParent.current && refCont.current) {
            const isScroll = refParent.current.scrollHeight > (refCont.current.offsetHeight - 32);
            if (isScroll) setScroll({...scroll, IsVisible: true})
            else setScroll({...scroll, IsVisible: false})
        }
    }, [])

    return (
        <div className={`${style.main} ${!isOpen && style.short}`}>
            <div className={`${style.gridTitle} ${!isOpen && style.gridTitleIpad}`}>
                <button ref={refTooltip} onClick={handleOpen} onMouseOver={handleOver} onMouseLeave={handleLeave} className={`${style.logo} ${!isOpen && style.logoIpad}`}>
                    <Image alt="" layout={"fill"} src={"/icons/spixAloneWhite.png"}/>
                </button>
                <div className={`${style.title} ${!isOpen && style.titleIpad}`}>{title}</div>
            </div>

            <div ref={refCont} className={style.contItems}>
                <div onScroll={handleScroll} ref={refParent} className={style.gridItems}>
                    {options.map((item: NavOptionsProps) => <NavItem link={link} key={item.Id} isIpad={!isOpen} item={item}/>)}
                    <div style={t} className={`${style.selected} ${!isOpen && style.selectedIpad}`}/>
                    <div style={t} className={`${style.bar} ${!isOpen && style.barIpad}`}/>
                </div>
            </div>

            <div className={style.bottom}>
                {
                    scroll.IsVisible &&
                    <div onClick={handleScrollButton} className={`${style.contArrow} ${scroll.State && style.flip}`}>
                        <div className={style.arrow}><Image alt="" src={""}/></div>
                    </div>
                }
                <Link href={"/"}><span className={style.return}>{returnText}</span></Link>
            </div>
        </div>
    )

    function handleOpen() {
        onGrid()
        setTooltip({...tooltip, State: false})
    }

    function handleOver() {
        const primerDiv = refTooltip.current;
        if (primerDiv) {
            const rect = primerDiv.getBoundingClientRect();
            setTooltip({
                State: true,
                PositionX: rect.left,
                PositionY: rect.bottom + 8
            })
        }
    }

    function handleLeave() {
        setTooltip({...tooltip, State: false})
    }

    function handleScroll() {
        if (refParent.current) {
            const div = refParent.current;
            if (div.scrollTop === 0) {
                setScroll({...scroll, State: false})
            }
            if (div.scrollHeight === (div.scrollTop + div.clientHeight)) {
                setScroll({...scroll, State: true})
            }
        }
    }

    function handleScrollButton() {
        if (refParent.current) {
            if (!scroll.State) {
                refParent.current.scrollTop = refParent.current.scrollHeight;
                setScroll({...scroll, State: true})
            } else {
                refParent.current.scrollTop = 0;
                setScroll({...scroll, State: false})
            }
        }
    }
}