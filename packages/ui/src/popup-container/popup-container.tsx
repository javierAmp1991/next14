//@ts-ignore
import style from "./popup-container.module.css";
import {ReactNode, MouseEvent} from "react";
import {createPortal} from "react-dom";
import {ID_PORTAL} from "../const";

export interface IPopUpContainer {
  Close: Function;
  IsBackground?: boolean;
  IsButton?: boolean;
  DontUseBlackScreen?: boolean;
  UseTransparent?: boolean;
  DontUserRender?: boolean;
  UsePropagation?: boolean;
}

export const PopUpContainer = ({children, props}: { children: any, props: IPopUpContainer }) => {
    const isButtonVisible = props.IsButton === undefined ? true : props.IsButton;
    const closeStyle = `${style.blackScreen} ${props.DontUseBlackScreen && style.cursorNormal}`;
    return (
        createPortal(
            <div className={style.mainDiv} onClick={stopPropagation}>
                <button onClick={handleCloseBlackScreen} className={closeStyle}/>
                {
                    props.DontUserRender ? children
                        :
                        <div className={`${style.renderDiv} ${props.UseTransparent && style.bgTransparent}`}>
                            {
                                isButtonVisible &&
                                <button onClick={handleClose} className={style.positionDeleteIcon}>
                                    <div className={style.deleteIcon}/>
                                </button>
                            }
                            <>{children}</>
                        </div>
                }
            </div>, document.getElementById(ID_PORTAL)!
        )
    )

    function stopPropagation(e: MouseEvent) {
        if (!props.UsePropagation) {
            e.stopPropagation()
            e.preventDefault()
        }
    }

    function handleClose() {
        props.Close()
    }

    function handleCloseBlackScreen() {
        if (!props.DontUseBlackScreen) props.Close()
    }
}