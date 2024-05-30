import React, {CSSProperties} from "react";
import {HeaderColumBase} from "./header-column-props";
import {PageChangeProps} from "./page-change";

export interface TableProps {
    ListHeader: HeaderColumBase[]
    FilterSelected?: string
    GridHeader: string
    TotalRows: number
    OnRowEnd: () => void
    Overscan?: number
    DontUseHorizontalPadding?: boolean | undefined
    DontUseExternalBorder?: boolean | undefined
    RowRender: (index: number, key: string, style: CSSProperties) => JSX.Element
}

export interface TableWithPaginationProps {
    ListHeader: HeaderColumBase[]
    FilterSelected?: string
    GridHeader: string
    TotalRows: number
    Overscan?: number
    DontUseHorizontalPadding?: boolean | undefined
    DontUseExternalBorder?: boolean | undefined
    RowRender: (index: number, key: string, style: CSSProperties) => JSX.Element
    HandlePage: (page: number) => void
    ActualPage: number
    TotalPages: number
    IsCharging: boolean
}

export interface IColumProps {
    Style: CSSProperties
    Index: number
    Key: string
}

export interface IIndexes {
    Start: number
    Finish: number
    TargetStart: number
    TargetEnd: number
}

export interface IHandleBoundaries {
    Page: number
    UpdateRows: boolean
    Top: number
    Bottom: number
}