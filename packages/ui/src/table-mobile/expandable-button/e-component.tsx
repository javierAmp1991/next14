//@ts-ignore
import css from "./expand-button.module.css";
import Image from "next/image";
import {CSSProperties} from "react";
import {EXPANDABLE_TEXT, MUTATION_TEXT} from "../const";
import {EDIT_ICON_BLUE} from "../../icons";

export const EComponent = ({isOpen, style, index}: { isOpen: boolean, style: CSSProperties, index: number }) => {
    return (
        <div className={css.main} style={style}>
            <div className={`${css.gridGradient} ${isOpen && css.borderBottom}`} onClick={handleToggle}>
                <div className={css.gradient}/>
                <div className={css.contIcon}>
                    {
                        isOpen ?
                            <div className={css.close}/>
                            :
                            <div className={css.image}>
                                <Image alt="" priority={true} layout={"fill"} src={EDIT_ICON_BLUE}/>
                            </div>
                    }
                </div>
            </div>
            <div onClick={handleMutation} className={` ${css.gridGradient} ${css.zIndex}`}>
                <div className={css.gradient}/>
                <div className={css.goTo}>
                    {isOpen && <div className={css.return}/>}
                </div>
            </div>
        </div>
    )

    function handleToggle() {
        isOpen ? handleClick() : handleMutation()
    }

    function handleClick() {
        const eventName = `${EXPANDABLE_TEXT}${index}`;
        const changeState = new CustomEvent(eventName);
        document.dispatchEvent(changeState);
    }

    function handleMutation() {
        const eventName = `${MUTATION_TEXT}${index}`;
        const changeState = new CustomEvent(eventName);
        document.dispatchEvent(changeState);
    }
}
