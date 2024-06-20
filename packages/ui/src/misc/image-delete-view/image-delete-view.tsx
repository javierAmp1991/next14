//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import {DeleteButton} from "../index";

export interface IImageDeleteView {
    Link: string,
    OnDelete: (i: string)=>void
    OnClick: (i: string)=>void
    Id: string
}

export const ImageDeleteView = ({Id, Link, OnClick, OnDelete}: IImageDeleteView) => {
    return (
        <button onClick={handleClick} className={style.main}>
            <DeleteButton Width={12} OnClick={handleDelete}/>
            <div className={style.contImage}>
                <Image alt="" layout={"fill"} src={Link}/>
            </div>
        </button>
    )

    function handleDelete() {
        OnDelete(Id)
    }

    function handleClick() {
        OnClick(Id)
    }
}