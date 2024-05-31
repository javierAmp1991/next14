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
      <input
        onChange={handleChange}
        checked={props.Value}
        name={props.Name}
        className={style.input}
        type={"checkbox"}
      />
      {props.Label !== undefined && (
        <span>
          {isObligatory && <span className={style.error}>* </span>}
          <span className={style.name}>{props.Label}</span>
        </span>
      )}
    </p>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.OnChange(e);
  }
};
