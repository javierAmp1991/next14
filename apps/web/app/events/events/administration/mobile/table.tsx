import {useMainContext} from "../provider";
import {EventsRowTable} from "../props";
import {Row, Table, TableProps, EmtyRow} from "@repo/ui/tableMobile";
import css from "./administration.module.css";
import {CSSProperties} from "react";
import EventsColumns from "./events-columns";

export default function TableBluePrint() {
    const {Events, HandleOpenMutation, Filters} = useMainContext();
    const rowRender = (index: number, key: string, style: CSSProperties) => {
        const item: EventsRowTable = Events[index]!;
        if (item === undefined) return <EmtyRow key={key} style={style} index={index}/>
        else return <Row IsOpen={false} key={key} Columns={<EventsColumns item={item}/>} Expandable={<div/>} Style={style} Index={index} Grid={css.grid!} OnMutation={() => HandleOpenMutation()}/>
    };
    const tableProps: TableProps = {
        TotalRows: Events.length,
        FilterSelected: "",
        OnRowEnd: ()=>{},
        GridHeader: css.grid!,
        ListHeader: Filters,
        RowRender: rowRender,
        Width: 1070
    };
    return <Table props={tableProps}/>
}