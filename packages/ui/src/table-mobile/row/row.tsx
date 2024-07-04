//@ts-ignore
import css from "./row.module.css";
import {CSSProperties, useEffect, useRef} from "react";
import {EXPANDABLE_TEXT, MUTATION_TEXT} from "../const";
import {useTableContext} from "../";

export type IRowMobile = {
    Style: CSSProperties
    Index: number
    Grid: string
    OnMutation: Function
    IsOpen: boolean
    Columns: JSX.Element
    Expandable: JSX.Element
    UseExpand?: boolean
}

export const Row = ({Style, Index, Columns, Expandable, Grid, OnMutation, IsOpen, UseExpand}: IRowMobile) => {
    const {RemoveRow, AddRow} = useTableContext();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(UseExpand){
            const expandEventName = `${EXPANDABLE_TEXT}${Index}`;
            const mutationEventName = `${MUTATION_TEXT}${Index}`;
            document.addEventListener(expandEventName, handleExpand);
            document.addEventListener(mutationEventName, handleMutation);
            return () => {
                document.removeEventListener(expandEventName, handleExpand);
                document.removeEventListener(mutationEventName, handleMutation);
            };
        }
    }, [Index, IsOpen]);

    return (
        <div style={Style} className={css.mainGrid}>
            <div onClick={handleExpand} className={`${css.grid} ${Grid} ${Index % 2 !== 0 ? css.bgGray : css.bgWhite}`}>
                {Columns}
            </div>
            {
                UseExpand &&
                <div onClick={handleMutation} ref={ref} className={css.expandable}>{Expandable}</div>
            }
        </div>
    )

    function handleExpand() {
        if(UseExpand){
            if (IsOpen) requestAnimationFrame(() => RemoveRow(Index))
            else requestAnimationFrame(() => AddRow(Index, ref.current!.offsetHeight))
        }
        else OnMutation()
    }

    function handleMutation() {
        OnMutation()
    }
}