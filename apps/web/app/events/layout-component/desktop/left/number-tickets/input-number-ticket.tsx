import style from "../style.module.css";
import {InputNumber, IInputNumber, InputTextChangeEvent} from "@repo/ui/customInputs";
import {MainButton, IMainButton} from "@repo/ui/mainButton";
import {useLayoutContext} from "../../../";
import {useState} from "react";

export default function InputNumberTicket({onConfirm}: { onConfirm: Function }) {
    const {} = useLayoutContext();
    const [number, setNumber] = useState<number>(1);
    const num: IInputNumber = {
        Value: `${number}`,
        OnChange: onChangeNumber,
        Name: "",
        IsObligatory: false,
        Placeholder: "Ingrese el numero de entradas"
    };
    const confirmButton: IMainButton = {
        Text: "Confirmar",
        OnClick: handleConfirm
    };
    return (
        <>
            <div>Ingresa el numero de entradas</div>
            <div className={style.gridButton}>
                <InputNumber props={num}/>
                <MainButton props={confirmButton}/>
            </div>
        </>
    )

    function onChangeNumber(e:InputTextChangeEvent ) {
        if (e.Event.target.value === "") setNumber(0)
        else setNumber(e.Event.target.valueAsNumber)
    }

    function handleConfirm(){
    }
}