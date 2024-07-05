//@ts-ignore
import style from "./input-checkbox.module.css";
import { ChangeEvent } from "react";

export interface IInputCheckbox {
  OnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  Label?: string;
  Value: boolean;
  Name: string;
  IsObligatory?: boolean;
}

export const InputCheckbox = ({ props }: { props: IInputCheckbox }) => {
  const isObligatory: boolean = props.IsObligatory ? props.IsObligatory : false;
  return (
    <p className={style.main}>
      <label className={style.input}>
          <input onChange={handleChange} checked={props.Value} name={props.Name} type={"checkbox"}/>
      </label>
      {props.Label !== undefined && <span className={style.name}>{props.Label}</span>}
    </p>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.OnChange(e);
  }
};
