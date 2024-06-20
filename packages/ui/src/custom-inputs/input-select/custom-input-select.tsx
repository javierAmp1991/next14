//@ts-ignore
import style from "./custom-input-select.module.css"
import {useEffect, useRef, useState, MouseEvent} from "react";
import Image from "next/image";
import {RIGHT_ARROW_GRAY, CHECK_ICON_GREEN} from "../../icons";

export interface IInputSelect {
    Name: string
    Options: IInputSelectOptions[]
    OnChange: Function
    IsDisable?: boolean
    Icon?: string
    Style?: string
    BorderColor?: boolean
    StyleIcon? : string
    StyleArrow?: string
    UseCheckBox?: boolean
    DontUseArrow?: boolean
    UsePrefixForSelected?: string
}

export interface IInputSelectOptions {
    Id: string
    Name: string
    Image?: string
    State?: boolean
}

export const InputSelect = ({prop}: { prop: IInputSelect }) => {
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const isDisable: boolean = prop.IsDisable ? prop.IsDisable : false;
    const isAnySelected: IInputSelectOptions | undefined = getName();

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        isDisable ?
            <div className={`${style.main} ${style.borderGray} ${style.disableBackground} ${prop.Style}`}>
                <div className={style.select}>
                    <div className={`${style.selectGray} ${style.clamp1}`}>
                        {prop.Name}
                    </div>
                    {
                        !prop.DontUseArrow &&
                        <div className={`${isOpen && style.arrowDown} ${style.contArrow}`}>
                            <Image alt="" layout={"fill"} src={RIGHT_ARROW_GRAY}/>
                        </div>
                    }
                </div>
            </div>
            :
            <div ref={selectRef} className={style.main}>
                {
                    isAnySelected ?
                        prop.UseCheckBox ?
                            <div onClick={onClick}
                                 className={`${style.select} ${style.grid} ${prop.Icon && style.grid} ${prop.Style}`}>
                                <input onClick={handleSelected} type={"checkbox"} className={style.chk} checked={true}/>
                                <div className={`${style.selectGray} ${style.clamp1}`}>
                                    {prop.UsePrefixForSelected && prop.UsePrefixForSelected} {isAnySelected.Name}
                                </div>
                                {
                                    !prop.DontUseArrow &&
                                    <div
                                        className={`${isOpen && style.arrowDown} ${style.contArrow} ${prop.StyleArrow}`}>
                                        <Image alt="" layout={"fill"} src={RIGHT_ARROW_GRAY}/>
                                    </div>
                                }

                            </div>
                            :
                            <div onClick={onClick}
                                 className={`${style.select} ${isAnySelected?.Image && style.grid} ${prop.Icon && style.grid} ${prop.Style}`}>
                                {
                                    isAnySelected.Image &&
                                    <div className={`${style.sizeIconStart} ${prop.StyleIcon}`}>
                                        <Image alt="" layout={"fill"} src={isAnySelected.Image}/>
                                    </div>
                                }
                                <div className={`${style.selectGray} ${style.clamp1}`}>
                                    {prop.UsePrefixForSelected && prop.UsePrefixForSelected} {isAnySelected.Name}
                                </div>
                                {
                                    !prop.DontUseArrow &&
                                    <div className={`${isOpen && style.arrowDown} ${style.contArrow} ${prop.StyleArrow}`}>
                                        <Image alt="" layout={"fill"} src={RIGHT_ARROW_GRAY}/>
                                    </div>
                                }

                            </div>
                        :
                        <div onClick={onClick}
                             className={`${style.select} ${prop.Icon && style.grid} ${prop.Style}`}>
                            {prop.Icon &&
                                <div className={`${style.sizeIconStart} ${prop.StyleIcon}`}>
                                    <Image alt="" layout={"fill"} src={prop.Icon}/>
                                </div>}
                            <div className={`${style.selectGray} ${style.clamp1}`}>
                                {prop.Name}
                            </div>
                            <div className={`${isOpen && style.arrowDown} ${style.contArrow} ${prop.StyleArrow}`}>
                                <Image alt="" layout={"fill"} src={RIGHT_ARROW_GRAY}/>
                            </div>
                        </div>

                }
                {
                    isOpen &&
                    <div className={`${isOpen ? style.open : style.close} ${style.selection}`}>
                        {
                            prop.Options.map(subItem =>

                                prop.UseCheckBox ?
                                    <button onClick={() => handleChange(subItem.Id)} className={style.option}>

                                        <input type={"checkbox"} checked={subItem.State}/>
                                        <div className={style.optionText}>
                                            {subItem.Name}
                                        </div>
                                        {
                                            (subItem.State != undefined && subItem.State) &&
                                            <div className={style.checkIcon}>
                                                <Image alt="" layout={"fill"} src={CHECK_ICON_GREEN}/>
                                            </div>
                                        }
                                    </button>
                                    :
                                    <button onClick={() => handleChange(subItem.Id)} className={style.option}>
                                        {
                                            subItem.Image !== undefined &&
                                            <div className={style.sizeIcon}>
                                                <Image alt="" layout={"fill"} src={subItem.Image}/>
                                            </div>
                                        }
                                        <div className={style.optionText}>
                                            {subItem.Name}
                                        </div>
                                        {
                                            (subItem.State != undefined && subItem.State) &&
                                            <div className={style.checkIcon}>
                                                <Image alt="" layout={"fill"} src={CHECK_ICON_GREEN}/>
                                            </div>
                                        }
                                    </button>
                            )
                        }
                    </div>
                }
            </div>
    )

    function handleChange(id: string) {
        prop.OnChange(id)
        onClick()
    }

    function getName() {
        return prop.Options.find(e => e.State);
    }

    function onClick() {
        setIsOpen(!isOpen);
    }

    function handleSelected(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        if (isAnySelected) prop.OnChange(isAnySelected.Id)
    }
}