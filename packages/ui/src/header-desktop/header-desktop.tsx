//@ts-ignore
import style from "./style.module.css";
import { MainButton, IMainButton } from "../main-button/main-button";
import Link from "next/link";

export interface IHeaderDesktop {
  Title: string;
  Description: string;
  Button?: IMainButton;
  OnClose?: () => void;
  LinkToReturn?: string
}

export const HeaderDesktop = ({ props }: { props: IHeaderDesktop }) => {
  return (
    <div className={style.main}>
      <div className={style.mainGrid}>
        <div className={style.gridTitleDescription}>
          <div className={style.title}>{props.Title}</div>
          <div className={style.description}>{props.Description}</div>
        </div>
        {props.Button && <div className={style.containerButton}><MainButton props={props.Button} /></div>}
      </div>
      {props.OnClose && props.LinkToReturn && (
        <Link href={props.LinkToReturn} className={style.closeContainer}><div className={style.close} /></Link>
      )}
    </div>
  );

  function handleClose() {
    props.OnClose && props.OnClose();
  }
};
