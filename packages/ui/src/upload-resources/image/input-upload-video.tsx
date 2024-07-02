//@ts-ignore
import style from "./input-upload-video.module.css";
import React, {ChangeEvent, useState} from "react";
import Image from "next/image";
import {PLACEHOLDER_UPLOAD_IMAGE, CLOSE_ICON_GRAY} from "../../icons";
import {STRING_EMPTY} from "../../const";
import {IUploadResources, Resource} from "../index";
import {ulid} from "ulid";

export default function InputUploadImage({item}: { item: IUploadResources }) {
    const [state, setState] = useState(false);
    const placeholder = item.Placeholder || PLACEHOLDER_UPLOAD_IMAGE;
    const textPlaceholder = item.PlaceholderText || "Subir imagen";
    return (
        <div className={`${style.main} ${item.UseAspectRatio && style.placeholder31}`}>
            {
                item.Link === STRING_EMPTY ?
                    item.IsAvailable ?
                        <label className={`${style.placeholder} ${item.UseAspectRatio && style.placeholder31}`}>
                            <div className={style.mainContPlaceholder}>
                                <div
                                    className={`${style.contPlaceHolder} ${item.UseAspectRatio && style.placeholder31}`}>
                                    <Image alt="" objectFit={"contain"} layout={"fill"} src={placeholder}/>
                                </div>
                                <p className={`${style.textPlaceholder} ${item.UseUpperPlaceholderText && style.textPlaceholderUpper}`}>
                                    {textPlaceholder}
                                </p>
                            </div>

                            <input id={item.Id} onChange={handleOnChange} className={style.input} name={item.Name}
                                   type={"file"}/>
                        </label>
                        :
                        <div
                            className={`${style.placeholder} ${style.noAvailable} ${item.UseAspectRatio && style.placeholder31}`}>
                            <div className={style.contPlaceHolder}>
                                <Image alt="" objectFit={"cover"} layout={"fill"} src={placeholder}/>
                            </div>
                        </div>
                    :
                    <>
                        <div onClick={handleOnClick}
                             className={`${style.placeholder} ${item.UseAspectRatio && style.placeholder31}`}>
                            <Image alt="" objectFit={"cover"} draggable={false} layout={"fill"} src={item.Link}/>
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

    function handleDelete() {
        item.OnDelete(item.Id)
    }

    function handleOnClick() {
        item.OnClick && item.OnClick(item.Id)
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            //@ts-ignore
            const url = URL.createObjectURL(file);
            const newResource: Resource = {
                Id: ulid(),
                Source: url,
                Type: item.Type
            }
            item.OnChange(newResource)
        }
    }
}