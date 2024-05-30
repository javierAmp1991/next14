//@ts-ignore
import style from "./style.module.css";
import { MainButton, IMainButton } from "../main-button/main-button";
import Image from "next/image";
import Link from "next/link";

export interface IHeaderDesktop {
  Title: string;
  Description: string;
  Button?: IMainButton;
  OnClose?: () => void;
  LinkToReturn?: string
}

export const HeaderDesktop = ({ props }: { props: IHeaderDesktop }) => {
  const newProps: IMainButton | undefined = props.Button
    ? { ...props.Button, Style: style.button }
    : undefined;
  return (
    <div className={style.main}>
      <div className={style.mainGrid}>
        <div className={style.gridTitleDescription}>
          <div className={style.title}>{props.Title}</div>
          <div className={style.description}>{props.Description}</div>
        </div>
        {newProps && <MainButton props={newProps} />}
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
