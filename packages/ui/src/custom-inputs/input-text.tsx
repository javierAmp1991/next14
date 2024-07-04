//@ts-ignore
import style from "./style.module.css";
import { ChangeEvent, useRef, useState, useId, useEffect } from "react";
import {InputPropsBase, EnumCustomInputErrors, EnumStyleCustomInput} from "./index";

export interface IInputText extends InputPropsBase{}

const defaultError = {
  IsError: false,
  ShowTooltip: false,
  Error: "",
};

const Errors = {
  EmptyValue: "Este campo es obligatorio"
};

const STRING_EMPTY = "";

export const InputText = ({props}:{props: IInputText}) => {
    const contRef = useRef<HTMLDivElement>(null);
    const controlRef = useRef<HTMLDivElement>(null); 
    const inputRef = useRef<HTMLInputElement>(null);
    const idTooltip = useId();
    const propsTooltip = { "data-tooltip-id": idTooltip };
    const [error, setError] = useState(defaultError);
    const [phTooltip, setPhTooltip] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const isDisable: boolean = props.IsDisable ? props.IsDisable : false;
    const className = `${props.Prefix && style.prefix} ${props.Style} ${isDisable && style.disable} ${error.IsError && style.mainError}`;
    const styleInput = getStyleInput();

    useEffect(()=>{
      if(contRef.current && controlRef.current){
        setIsOverflow(controlRef.current.offsetWidth > contRef.current.clientWidth)
      }    
    },[])

    const inputProps = {
       autoComplete: "off",
       disabled: isDisable || false,
       name: props.Name,
       type: "text",
       placeholder: props.Placeholder || STRING_EMPTY,
       value: props.Value
    };

    return (
    <div className={style.main}>{props.TitleInput !== undefined && (
        <p>
          <span className={style.title}>{props.TitleInput}</span>
          {props.IsObligatory && <span className={style.isObligatory}> *</span>}
        </p>
      )}

      <div ref={contRef} className={`${styleInput} ${className}`}>
        {props.Prefix && (<span className={style.prefixColor}>{props.Prefix}:</span>)}
        <input title={props.Placeholder} ref={inputRef} onChange={handleChange} onFocus={handleFocus} onBlur={handleChange} className={`${style.input}`} {...inputProps}/>
        {error.IsError && (<button onMouseOver={handleOver} onMouseLeave={handleLeave} {...propsTooltip} className={style.errorCont}>!</button>)}
        <div ref={controlRef} className={style.controlPLaceholder}>{props.Placeholder}</div>
        {(phTooltip && isOverflow) && <div className={style.placeholderTooltip}>{props.Placeholder}</div>}
      </div>
    </div>
  )

   function handleChange(e: ChangeEvent<HTMLInputElement>) {
     e.preventDefault();
     e.stopPropagation();
     let error: EnumCustomInputErrors | undefined = undefined;
     if (!isDisable) {
         if (e.target.value === STRING_EMPTY && props.IsEmptyValueInvalid) {
           error = EnumCustomInputErrors.EmptyValue;
           setError({
             IsError: true,
             ShowTooltip: true,
             Error: Errors.EmptyValue,
           });
         } else setError(defaultError);
       props.OnChange({ Event: e, Error: error });
       setPhTooltip(e.target.value === "")
     }
     setPhTooltip(false)
   }

     function getStyleInput() {
       if (props.StyleInput === undefined) return style.contInput;
       else if (props.StyleInput === EnumStyleCustomInput.Default) return style.contInput;
       else if (props.StyleInput === EnumStyleCustomInput.Line) return style.contInputLine;
       else if (props.StyleInput === EnumStyleCustomInput.NoLine) return style.noLine;
       else return style.contInput;
     }

   function handleOver() {
     setError({ ...error, ShowTooltip: true });
   }

   function handleLeave() {
     setError({ ...error, ShowTooltip: false });
     setPhTooltip(false)
   }

   function handleFocus(){
       setPhTooltip(props.Value === "")
   }
}
