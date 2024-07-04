import React, {CSSProperties} from "react";
import {HeaderColumn, HeaderColumAscDes, HeaderColumMultiple, HeaderColumNumericRange} from "./header-column-props";
type FilterOpt = HeaderColumAscDes | HeaderColumMultiple | HeaderColumNumericRange | HeaderColumn

export interface TableProps {
    ListHeader: FilterOpt[]
    FilterSelected?: string
    GridHeader: string
    TotalRows: number
    Width: number
    Overscan?: number
    OnRowEnd: () => void
    RowRender: (index: number, key: string, style: CSSProperties, isOpen: boolean) => JSX.Element
}

export interface IVariableRow {
    Index: number
    Height: number
}

export interface ITouches {
    ClientY: number
    ClientX: number
    Time: number,
    IsVertical?: boolean
}

export interface IColumProps {
    Style: CSSProperties
    Index: number
    Key: string
    IsOpen: boolean
}

export interface IExpandableProps {
    Style: CSSProperties
    Index: number
    Key: string
    IsOpen: boolean
}

export interface IBreakpoints {
    Bottom: number
    Top: number
}

export interface IIndexes {
    Start: number
    Finish: number
    TargetStart: number
    TargetEnd: number
}