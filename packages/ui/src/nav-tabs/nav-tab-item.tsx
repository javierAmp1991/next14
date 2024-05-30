//@ts-ignore
import style from "./tabs-sections-control.module.css";
import {NavTabsProps} from "./tabs-sections-control-props";

export const NavTabItem = ({props, handleClick}:{ props: NavTabsProps, handleClick?: Function }) => {
    return (
        <b id={props.Id} onClick={onClick} className={`${style.main} ${props.IsBlocked && style.blocked}
            ${props.State && style.selected} ${props.DontUseCursor && style.dontCursor}`}>
            {props.Name}
        </b>
    )

    function onClick() {
        if (!props.IsBlocked && handleClick) handleClick(props.Position, props.Id)
    }
}