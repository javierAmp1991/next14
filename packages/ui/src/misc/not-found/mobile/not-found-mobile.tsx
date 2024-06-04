//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import {SOMETHING_WENT_WRONG} from "../../../const";
import {NOT_FOUND_IMAGE} from "../../../icons";
import {INotFound} from "../not-found-props";

export const NotFoundMobile = ({props}:{props: INotFound})=>{
    return(
        <div className={style.main}>
            <div className={style.image}>
                <Image layout={"fill"} alt="" src={NOT_FOUND_IMAGE}/>
            </div>
            <div>{SOMETHING_WENT_WRONG} {props.Text}</div>
            <Link href={props.Href}>
                <span className={style.link}>{props.ReturnText}</span>
            </Link>
        </div>
    )
}
    