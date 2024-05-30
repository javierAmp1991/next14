//@ts-ignore
import style from "./charging-page.module.css";
import Image from "next/image";

export const ChargingPage = ()=>{
    return (
        <div className={style.main}>
            <div className={style.cont}>
                 <div className={style.image}>
                      <Image alt="" priority={true} layout={"fill"} src={"/icons/spixAloneBlue.png"}/>
                 </div>
            </div>
            <div className={style.cicle}/>
        </div>
    )
}