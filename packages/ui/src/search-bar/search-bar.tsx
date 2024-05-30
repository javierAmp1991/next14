//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import React, {ChangeEvent} from "react";
import {IUseSearch} from "./index";
import { GLASS_WHITE, CLOSE_ICON_GRAY } from "../icons";


export interface ISearchBar{
    Style?: string
    Name: string
    Placeholder: string
}

export const SearchBar = ({props, searchBarProps}: { props: IUseSearch, searchBarProps: ISearchBar })=>{
    const inputProps = {value: props.Value, name: searchBarProps.Name, placeholder:searchBarProps.Placeholder, type: "text"};

    return (
        <div className={`${style.main} ${props.IsSearching && style.padding2} ${searchBarProps.Style}`}>
            {
                props.IsSearching &&
                <button onClick={handleDeleteSearch} className={style.close}>
                    <Image alt="" layout={"fill"} src={CLOSE_ICON_GRAY}/>
                </button>
            }

            <input className={style.input} onChange={handleChange} onKeyDown={onKeyPress} {...inputProps}/>

            <button onClick={handleClick} className={style.contButton}>
                <div className={style.sizeButton}>
                    <Image alt="" layout={"fill"} src={GLASS_WHITE}/>
                </div>
            </button>
        </div>
    )

    function handleClick() {
        props.HandleSearch();
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        props.HandleChange(e)
    }

    function handleDeleteSearch() {
        props.HandleDeleteSearch()
    }

    function onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") props.HandleSearch()
    }
}

export const SearchBarGrid = ({children}:{children: React.ReactNode})=>{return (<div className={style.searchBarGrid}>{children}</div>)}