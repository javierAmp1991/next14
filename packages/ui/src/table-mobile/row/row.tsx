//@ts-ignore
import css from "./row.module.css";
import React, {CSSProperties, useEffect, useRef} from "react";
import {EXPANDABLE_TEXT, MUTATION_TEXT} from "../const";
import {useTableContext} from "../";

export const Row = ({style, index, Columns, Expandable, grid, onMutation, isOpen}: {
    style: CSSProperties, index: number, grid: string, onMutation: Function, isOpen: boolean
    Columns: JSX.Element, Expandable: JSX.Element
}) => {
    const {RemoveRow, AddRow} = useTableContext();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const expandEventName = `${EXPANDABLE_TEXT}${index}`;
        const mutationEventName = `${MUTATION_TEXT}${index}`;
        document.addEventListener(expandEventName, handleExpand);
        document.addEventListener(mutationEventName, handleMutation);
        return () => {
            document.removeEventListener(expandEventName, handleExpand);
            document.removeEventListener(mutationEventName, handleMutation);
        };
    }, [index, isOpen]);

    return (
        <div style={style} className={css.mainGrid}>
            <div onClick={handleExpand} className={`${css.grid} ${grid} ${index % 2 !== 0 ? css.bgGray : css.bgWhite}`}>
                {Columns}
            </div>
            <div onClick={handleMutation} ref={ref} className={css.expandable}>
                {Expandable}
            </div>
        </div>
    )

    function handleExpand() {
        if (isOpen) requestAnimationFrame(() => RemoveRow(index))
        else requestAnimationFrame(() => AddRow(index, ref.current!.offsetHeight))
    }

    function handleMutation() {
        onMutation()
    }
}