//@ts-ignore
import style from "./style.module.css";
import React from "react";
export interface IMutationContainerGrid {
    Style?: string
    Grid?: EnumMutationContainerGrid
    UseDefaultPadding?: boolean
}

export enum EnumMutationContainerGrid{
    Normal, Rules, Edit
}

export const MutationContainerGrid = ({children, props}:{children: React.ReactNode, props: IMutationContainerGrid})=>{
    const grid = getGrid();
    return (
    <div className={`${style.main} ${grid} ${props.Style} ${props.UseDefaultPadding && style.padding}`}>
        {children}
    </div>
    )
    function getGrid() {
        if (props.Grid === undefined || props.Grid === EnumMutationContainerGrid.Normal) return ""
        else if (props.Grid === EnumMutationContainerGrid.Rules) return style.gridRules
        else if (props.Grid === EnumMutationContainerGrid.Edit) return style.gridEdit
        else return ""
    }
}