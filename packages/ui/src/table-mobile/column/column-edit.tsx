//@ts-ignore
import style from "./column.module.css";
import {Column} from "./column";

export const ColumnEdit = ({post, name}: { post?: string, name?: string }) => {
    const nwName = name ? name : "Editar";
    const title = `${nwName} ${post}`;
    return <Column><div className={style.gridEdit} title={title}>{nwName}</div></Column>
}