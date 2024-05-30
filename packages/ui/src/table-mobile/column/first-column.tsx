//@ts-ignore
import style from "./column.module.css";
import {Column} from "./column";
import Image from "next/image";

export const FirstColumn = ({name, image, useIcon}:{name: string, image: string, useIcon?: boolean})=>{
    return (
      <Column useGrid={true}>
        <div className={`${style.image} ${useIcon && style.icon}`}><Image alt="" src={image} layout={"fill"} /></div>
        <div>{name}</div>
      </Column>
    );
}