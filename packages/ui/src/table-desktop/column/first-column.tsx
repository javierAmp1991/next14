//@ts-ignore
import style from "./column.module.css";
import {Column} from "./column";
import Image from "next/image";

export const FirstColum = ({name, image, useIcon}:{name: string, image: string, useIcon?: boolean})=>{
    return (
      <Column useGrid={true} useSpace={true} title={name}>
        <div className={`${style.image} ${useIcon && style.icon}`}><Image alt="" src={image} layout={"fill"} /></div>
        <div>{name}</div>
      </Column>
    );
}