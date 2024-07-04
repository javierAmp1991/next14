//@ts-ignore
import style from "./style.module.css";
import { ChangeEvent, useRef, useState, useId, useEffect } from "react";
import {InputPropsBase, EnumCustomInputErrors, EnumStyleCustomInput} from "./index";

export interface IInputNumber extends InputPropsBase {
  MinValue?: number
  MaxValue?: number
}


const defaultError = {
  IsError: false,
  ShowTooltip: false,
  Error: "",
};

const Errors = {
  EmptyValue: "Este campo es obligatorio",
  OutOfRange: "Valor fuera de rango"
};

const STRING_EMPTY = "";

export const InputNumber = ({props}:{props: IInputNumber}) => {
    const contRef = useRef<HTMLDivElement>(null);
    const controlRef = useRef<HTMLDivElement>(null); 
    const idTooltip = useId();
    const propsTooltip = { "data-tooltip-id": idTooltip };
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(defaultError);
    const isDisable: boolean = props.IsDisable ? props.IsDisable : false;
    const className = `${props.Prefix && style.prefix} ${props.Style} ${isDisable && style.disable} ${error.IsError && style.mainError}`;
    const styleInput = getStyleInput();
    const inputProps = {
       autoComplete: "off",
       disabled: isDisable || false,
       name: props.Name,
       type: "number",
       placeholder: props.Placeholder || STRING_EMPTY,
       value: props.Value
    };
    const [phTooltip, setPhTooltip] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(()=>{
      if(contRef.current && controlRef.current){
        setIsOverflow(controlRef.current.offsetWidth > contRef.current.clientWidth)
      }    
    },[])

    return (
    <div className={style.main}>{props.TitleInput !== undefined && (
        <p>
          <span>{props.TitleInput}</span>
          {props.IsObligatory && <span className={style.isObligatory}> *</span>}
        </p>
      )}

      <div ref={contRef} className={`${styleInput} ${className}`}>
        {props.Prefix && (<span className={style.prefixColor}>{props.Prefix}:</span>)}
        <input ref={inputRef} onClick={handleFocus} onChange={handleChange} onFocus={handleFocus} onBlur={handleOut} className={`${style.input}`} {...inputProps}/>
        {error.IsError && (
          <button onMouseOver={handleOver} onMouseLeave={handleLeave} {...propsTooltip} className={style.errorCont}>!</button>
        )}
        <div ref={controlRef} className={style.controlPLaceholder}>{props.Placeholder}</div>
        {(phTooltip && isOverflow) && <div className={style.placeholderTooltip}>{props.Placeholder}</div>}
        
      </div>
    </div>
  )

   function handleChangeEvent(e: ChangeEvent<HTMLInputElement>) {
     e.preventDefault();
     e.stopPropagation();
     let error: EnumCustomInputErrors | undefined = undefined;
     if (!isDisable) {
      if (props.MinValue !== undefined && props.MaxValue !== undefined) {
        if (e.target.valueAsNumber > props.MaxValue || e.target.valueAsNumber < props.MinValue) {
          error = EnumCustomInputErrors.OutOfRange;
          setError({
            IsError: true,
            ShowTooltip: true,
            Error: Errors.OutOfRange,
          });
        } else if (props.IsEmptyValueInvalid && isNaN(e.target.valueAsNumber)) {
          error = EnumCustomInputErrors.EmptyValue;
          setError({
            IsError: true,
            ShowTooltip: true,
            Error: Errors.EmptyValue,
          });
        } else setError(defaultError);
      } else setError(defaultError);
       props.OnChange({ Event: e, Error: error });
     }
   }

   function handleChange(e: ChangeEvent<HTMLInputElement>) {
    handleChangeEvent(e)
    if(e.target.value === "") setPhTooltip(true)
    else setPhTooltip(false)
 }
 function handleOut(e: ChangeEvent<HTMLInputElement>){
   handleChangeEvent(e)
   setPhTooltip(false) 
 }

  function getStyleInput() {
       if (props.StyleInput === undefined) return style.contInput;
       else if (props.StyleInput === EnumStyleCustomInput.Default) return style.contInput;
       else if (props.StyleInput === EnumStyleCustomInput.Line) return style.contInputLine;
       else if (props.StyleInput === EnumStyleCustomInput.NoLine) return style.noLine
       else return style.contInput;
  }

   function handleOver() {
     setError({ ...error, ShowTooltip: true })
   }

   function handleLeave() {
     setError({ ...error, ShowTooltip: false })
     setPhTooltip(false)
   }

   function handleFocus(){
      if(props.Value === "" || props.Value === undefined) setPhTooltip(true)
      else setPhTooltip(false)
   }
}
