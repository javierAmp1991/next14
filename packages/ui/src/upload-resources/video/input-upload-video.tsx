//@ts-ignore
import style from "./input-upload-video.module.css";
import {useState} from "react";
import Image from "next/image";
import { STRING_EMPTY } from "../../const";
import {CLOSE_ICON_GRAY, YOUTUBE_ICON } from "../../icons";
import { IUploadResources } from "../index";


export default function InputUploadVideo({item}: { item: IUploadResources }) {
    const [state, setState] = useState(false);
    const placeholder = item.Placeholder || YOUTUBE_ICON;

    return (
        <div className={style.main}>
            {
                item.Link === STRING_EMPTY ?
                   <div className={`${style.placeholder} ${!item.IsAvailable && style.opacity}`} onClick={handlePopUp}>
                       <div className={style.mainContPlaceholder}>
                           <div className={`${style.contPlaceHolder} ${item.UseAspectRatio && style.placeholder31}`}>
                               <Image alt="" objectFit={"contain"} layout={"fill"} src={placeholder}/>
                           </div>
                           <p className={style.textPlaceholder}>Subir video</p>
                       </div>
                    </div>
                    :
                    <>
                        <div onClick={handleOnClick} className={style.placeholder}>
                            <Image alt="" objectFit={"cover"} layout={"fill"} src={getThumbnail()}/>
                        </div>
                        <div onClick={handleOnClick} className={style.icon}>
                            <Image alt="" layout={"fill"} src={YOUTUBE_ICON}/>
                        </div>
                        <button onClick={handleDelete} className={style.contCloseIcon}>
                            <div className={style.closeIcon}>
                                <Image alt="" layout={"fill"} src={CLOSE_ICON_GRAY}/>
                            </div>
                        </button>
                    </>
            }
        </div>
    )

    function handlePopUp() {
        item.IsAvailable && setState(!state)
    }

    function getThumbnail() {
        const id = obtainId(item.Link);
        if (id !== null) return `https://img.youtube.com/vi/${id}/default.jpg`;
        else return ""
    }

    function obtainId(link: string) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = link.match(regExp);
        return match && match[7] ? match[7] : null;
    }

    function handleDelete() {
        item.OnDelete(item.Id)
    }

    function handleAccept(link: string) {
        if (link !== STRING_EMPTY) item.OnChange(link, item.Type)
        handlePopUp()
    }

    function handleOnClick() {
        item.OnClick && item.OnClick(item.Id)
    }
}