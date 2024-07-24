import {useMainContext} from "../provider";
import {EventsRowTable} from "../props";
import {Row, TableDesktop, TableProps, EmptyRow} from "@repo/ui/tableDesktop";
import css from "./administration.module.css";
import {CSSProperties} from "react";
import EventsColumns from "./events-columns";

export default function TableBluePrint() {
    const {Events, HandleOpenMutation, Filters} = useMainContext();
    const rowRender = (index: number, key: string, style: CSSProperties) => {
        const item: EventsRowTable = Events[index]!;
        if (item === undefined) return <EmptyRow key={key} style={style} index={index}/>
        else return <Row key={key} Columns={<EventsColumns item={item}/>} style={style} index={index} grid={css.grid!} onMutation={() => HandleOpenMutation(item.Id)}/>
    };
    const tableProps: TableProps = {
        TotalRows: Events.length,
        FilterSelected: "",
        OnRowEnd: ()=>{},
        GridHeader: css.grid!,
        ListHeader: Filters,
        RowRender: rowRender
    };
    return <TableDesktop props={tableProps}/>
}