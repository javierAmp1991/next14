import style from "./popup-upload.module.css";
import {CustomInput, CustomInputProps} from "../../../custom-input";
import {ButtonWithIcon, ButtonWithIconProps} from "../../../../common/button-with-icon";
import {useState} from "react";
import {STRING_EMPTY} from "../../../../../public"

const propIframe: string = "accelerometer; autoplay; clipboard-write;" +
    " encrypted-media; gyroscope; picture-in-picture; web-share; display-capture;";
const styleIFrame = {border: 0, width: "100%", height: "100%"};

export default function PopupUpload({handleAccept}: { handleAccept: Function }) {
    const [link, setLink] = useState(STRING_EMPTY);
    const [send, setSend] = useState(false);
    const inputProps: CustomInputProps = {
        Name: "inputLink",
        IsObligatory: false,
        Value: link,
        TypeInput: "text",
        Placeholder: "https://www.youtube.com/embed/example",
        OnChange: handleChange
    };
    const button: ButtonWithIconProps = {
        Text: "Agregar video",
        OnClick: onAccept,
        Style: send ? "" : style.button
    }
    return (
        <div className={style.main}>
            <div className={style.title}>
                Ingrese un link
            </div>
            <CustomInput item={inputProps}/>
            {
                link !== STRING_EMPTY &&
                <div className={style.contIframe}>
                    <iframe src={link} allow={propIframe} style={styleIFrame}/>
                </div>
            }
            <ButtonWithIcon prop={button}/>
        </div>
    )

    function handleChange(e: any) {
        setLink(e.target.value)
        setSend(true)
    }

    function onAccept() {
        handleAccept(link)
    }
}

