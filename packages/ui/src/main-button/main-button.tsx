
//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";

export interface IMainButton {
    Text: string
    OnClick: Function
    IconStart?: string
    ColorButton?: EnumColorMainButton
    Style?: string
    IsDisable?: boolean
    UseTiny?: boolean
    IsSquare?: boolean
    Propagate?: boolean
    IsCharging?: boolean
    TextForCharging?: string
}

export enum EnumColorMainButton {
    UseBorder, UseWhite, UseBlue, Disable
}

export const MainButton = ({props}:{props: IMainButton})=>{
    const colorButton = getColorButton();
    return(
          <div onClick={handleClick} className={`${style.main} ${colorButton} ${props.Style}`}>
            {
                props.IsCharging ? 
                <><div>{props.TextForCharging || "Enviando"}</div> <div className={style.loader}/></>
                :
                <>{props.IconStart && <Image alt="" src={props.IconStart} layout={"fill"} />} {props.Text}</>
            } 
          </div>

    )
    function getColorButton(){
        if (props.IsDisable) return style.disable
        else if(props.ColorButton === EnumColorMainButton.UseBlue) return style.blue
        else if (props.ColorButton === EnumColorMainButton.UseBorder) return style.border
        else if (props.ColorButton === EnumColorMainButton.UseWhite) return style.white
        else return ""
    }

    function handleClick(){
        props.OnClick()
    }
}