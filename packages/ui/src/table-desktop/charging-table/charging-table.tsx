//@ts-ignore
import css from "./charging-table.module.css";
import {useLayoutEffect, useRef, useState} from "react";
import {ChargingTableProps} from "../props";
import ColumnHeader from "../filters/column-header";

const ROW_HEIGHT = 80;

export default function ChargingTable({props}: { props: ChargingTableProps }) {
    const ref = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState(0)
    useLayoutEffect(() => {
        if (ref.current) {
            const total = Math.ceil(ref.current.clientHeight / ROW_HEIGHT);
            setRows(total)
        }
    }, [])

    return (
        <div className={css.mainCont}>
            <div className={css.main}>
                <div className={`${css.mainHeader} ${props.Grid}`}>
                    {props.ListHeader.map((e: any) => <ColumnHeader name={e}/>)}
                </div>
                <div ref={ref} className={css.mainLoader}>
                    {
                        [...Array(rows)].map((e, index) =>
                            <div key={e} style={{height: ROW_HEIGHT}} className={`${css.row} ${index % 2 !== 0 && css.bgGray}`}/>
                        )
                    }
                    <div className={css.loader}/>
                </div>
            </div>
        </div>
    )
}