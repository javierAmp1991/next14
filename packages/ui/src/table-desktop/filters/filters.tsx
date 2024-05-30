//@ts-ignore
import style from "./filters.module.css";
import {EnumTypeHeaderColum, HeaderColumBase} from "../props";
import {AscDes} from "./asc-des";
import Multiple from "./multiple";
import NumRange from "./numeric-range";
import {ColumnHeader} from "./column-header";

export const Filters = ({filters, grid, selected}:{
     filters: HeaderColumBase[], grid: string, selected?: string }) => {
    return (
        <div className={`${style.gridHeader} ${grid}`}>
            {filters.map(e => {
                    if (e.Type === undefined) return <ColumnHeader name={e.Name} key={e.Name}/>
                    else if (e.Type === EnumTypeHeaderColum.AscDesc)
                        return <AscDes props={e} key={e.Name} isSelected={selected === e.Name}/>
                    else if (e.Type === EnumTypeHeaderColum.Multiple)
                        return <Multiple props={e} key={e.Name} isSelected={selected === e.Name}/>
                    else if (e.Type === EnumTypeHeaderColum.NumRange)
                        return <NumRange props={e} key={e.Name} isSelected={selected === e.Name}/>
                })
            }
        </div>
    )
}