//@ts-ignore
import style from "./style.module.css";
import React from "react";

export interface IMutationContainerShort {
Type?: EnumMutationContainerShort
Style?: string
}

export enum EnumMutationContainerShort{
    Small, Normal, Large
}

export const MutationContainerShort = ({children, props}:{children: React.ReactNode, props: IMutationContainerShort})=>{
    const s = getStyle();
    return <div className={style.main}><div className={`${style.subMain} ${s} ${props.Style}`}>{children}</div></div>

    function getStyle(){
        if (props.Type === EnumMutationContainerShort.Normal || props.Type === undefined) return ""
        else if(props.Type === EnumMutationContainerShort.Large) return style.large
        else if(props.Type === EnumMutationContainerShort.Small) return style.small
    }
}