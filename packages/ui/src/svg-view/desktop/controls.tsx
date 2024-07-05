//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import {CONTRACT_ICON, EXPAND_ICON, REFRESH_ICON} from "../../icons";
import {IControls} from "../props";

export default function Controls({props}: { props: IControls }) {
    const {ZoomIn, ZoomOut, Reset, FullScreen, HandleFullScreen} = props;
    return (
        <div className={style.buttons}>
            <button className={style.button} onClick={() => ZoomIn()}>
                +
            </button>
            <button className={style.button} onClick={() => ZoomOut()}>
                -
            </button>
            {
                (FullScreen !== undefined && HandleFullScreen !== undefined) &&
                <button className={style.button} onClick={() => HandleFullScreen!()}>
                    <Image alt="" width={14} height={14} src={FullScreen ? CONTRACT_ICON : EXPAND_ICON}/>
                </button>
            }
            <button className={style.button} onClick={() => Reset()}>
                <Image alt="" width={14} height={14} src={REFRESH_ICON}/>
            </button>
        </div>
    )
}