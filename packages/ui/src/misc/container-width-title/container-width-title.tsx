
//@ts-ignore
import style from "./style.module.css";

export interface IContainerWidthTitle {
  IsObligatory?: boolean;
  Title: string;
  DontUseSpace?: boolean;
  LessGap?: boolean;
  UseBorderBottom?: boolean;
  UseGridForChildren?: boolean;
  Style?: string;
  Subtitle?: string
}

export  const ContainerWidthTitle = ({children, props}: {children: React.ReactNode, props: IContainerWidthTitle})=>{
  const mainStyle = `${style.main} ${props.Style} ${props.LessGap && style.lessGap} ${props.UseBorderBottom && style.border}`;
  const childrenStyle = `${style.children} ${props.DontUseSpace && style.dontUseSpace} ${props.UseGridForChildren && style.grid}`;
    return (
      <div className={mainStyle}>
        <div>
        <p className={style.title}><span> {props.Title} </span> {props.IsObligatory && <span className={style.isObligatory}>*</span>}</p>
        {props.Subtitle && <p className={style.subtitle}>{props.Subtitle}</p>}
        </div>

        <div className={childrenStyle}>{children}</div>
      </div>
    );
}