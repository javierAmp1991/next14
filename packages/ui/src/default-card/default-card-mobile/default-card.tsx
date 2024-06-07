//@ts-ignore
import style from "./style.module.css";
import {  RIGHT_ARROW_BLACK} from "../../icons";
import Image from "next/image";
import { IDefaultCard } from "../default-card";
import Link from "next/link";

export const DefaultCardMobile = ({props}: {props: IDefaultCard}) => {
    const Children = () => <>
      <div className={style.bg} />
  <div className={style.mainGrid}>
    <div className={style.profile}>
      <Image alt="" layout={"fill"} src={props.Image} />
    </div>
    <div className={style.contInformation}>
      <div className={`${style.name}`}>{props.First}</div>
      <div className={style.sku}>{props.Second}</div>
    </div>
    <div className={style.arrow}>
      <Image
        className={`${style.gray}`}
        width={14}
        height={14}
        alt=""
        src={RIGHT_ARROW_BLACK}
      />
    </div>
  </div>
    </>
    const s = `${style.main} ${props.NewStyle}`;
  return (
    props.Href ?
    <Link href={props.Href} className={s}>
       <Children/>
    </Link>
    :
    <div className={s}>
       <Children/>
    </div>
  );
};
