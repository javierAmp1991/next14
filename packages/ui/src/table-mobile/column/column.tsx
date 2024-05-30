//@ts-ignore
import style from "./column.module.css";

export const Column = ({children, useGrid, useClamp}: {children: React.ReactNode, useGrid?: boolean, useClamp?: boolean}) => {
    return (
        <div className={`${style.main} ${useGrid && style.grid}`}>
            {useClamp ? <span className={style.clamp2}>{children}</span> : children}
        </div>
    )
}