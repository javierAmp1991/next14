//@ts-ignore
import style from "./column.module.css";

export const Column = ({children, useGrid, useSpace, title, useClamp}: {
    children: React.ReactNode, useGrid?: boolean, useSpace?: boolean, title?: string, useClamp?: boolean}) => {
    return (
        <div title={title} className={`${style.main} ${useSpace && style.space} ${useGrid && style.grid}`}>
            {useClamp ? <span className={style.clamp2}>{children}</span> : children}
        </div>
    )
}