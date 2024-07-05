//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import {RIGHT_ARROW_BLACK} from "../../icons";
import {useState} from "react";
import {MainButton, IMainButton, EnumColorMainButton} from "../../main-button/main-button";

const info = [
    {
        Name: "Disponible",
        Style: style.available
    },
   /* {
        Name: "Reventa",
        Style: style.resale
    },*/
    {
        Name: "Deshabilitado",
        Style: style.disable
    }
];

export default function Information({onRefresh}: { onRefresh?: Function | undefined }) {
    const [show, setShow] = useState(false);
    const refresh: IMainButton = {
        OnClick: handleRefresh,
        Text: "Refrescar",
        UseTiny: true,
        ColorButton: EnumColorMainButton.UseWhite
    };
    return (
        <div className={style.mainInfo}>
            <button onClick={handleShow} className={style.gridInfo}>
                Glosa <Image alt="" className={`${show && style.rotate}`} width={10} height={10} src={RIGHT_ARROW_BLACK}/>
            </button>
            {
                show &&
                <div className={style.contInfo}>
                    {info.map(i =>
                        <div className={style.gridSubInfo}>
                            <div className={`${style.circle} ${i.Style}`}/>
                            <div>{i.Name}</div>
                        </div>)}
                    {onRefresh !== undefined && <div className={style.contInfo}><MainButton props={refresh}/></div>}
                </div>
            }
        </div>
    )

    function handleShow() {
        setShow(!show)
    }

    function handleRefresh() {
        onRefresh && onRefresh()
    }
}