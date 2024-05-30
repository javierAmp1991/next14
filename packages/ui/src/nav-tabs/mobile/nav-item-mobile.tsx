//@ts-ignore
import style from "./tabs-sections-control.module.css";
import {NavTabsProps} from "../tabs-sections-control-props";

export const NavItemMobile = ({props, handleClick}: { props: NavTabsProps, handleClick?: Function }) => {
    return (
        <div id={props.Id} onClick={onClick} className={` ${style.main} ${props.State && style.selected}`}>
            {props.Name}
        </div>
    )
    function onClick(){
        handleClick && handleClick(props.Position, props.Id)
    }
}