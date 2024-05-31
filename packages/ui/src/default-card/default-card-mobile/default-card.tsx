//@ts-ignore
import style from "./style.module.css";
import { CHECK_ICON_GREEN } from "../../icons";
import Image from "next/image";
import { IDefaultCard } from "../default-card";
import { RIGHT_ARROW_Blue } from "../../icons";

export const DefaultCardMobile = ({ props }: { props: IDefaultCard }) => {
  const styleHover = props.NoHover
    ? style.noHover
    : props.Selected
      ? style.selected
      : style.noSelected;
  return (
    <div className={`${style.main}  ${styleHover} ${props.NewStyle}`}>
      <div className={style.bg} />
      <div className={style.mainGrid}>
        <div className={style.profile}>
          <Image alt="" layout={"fill"} src={props.Image} />
        </div>
        <div className={style.contInformation}>
          <div className={`${style.name}`}>{props.First}</div>
          <div className={style.sku}>{props.Second}</div>
        </div>
        <div className={style.arrow}>
          <Image width={14} height={14} alt="" src={RIGHT_ARROW_Blue} />
        </div>
      </div>
      {props.Selected && (
        <div className={style.icon}>
          <Image alt="" layout={"fill"} src={CHECK_ICON_GREEN} />
        </div>
      )}
    </div>
  );
};
