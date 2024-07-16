import style from "../style.module.css";
import Button from "./button";
import {useLayoutContext} from "../../../index";
import {useState} from "react";
import {IInputCheckbox, InputCheckbox} from "@repo/ui/customInputs";

export default function SelectNumber({isInitial}: { isInitial?: boolean }) {
    const {} = useLayoutContext();
    const [display, setDisplay] = useState(false);
    const chk: IInputCheckbox = {
        Value: true,
        Label: "¿Los asientos deben estar juntos?",
        OnChange: onChange,
        Name: ""
    };
    const NumberTickets = 2;
    const IsFirstSelect = true
    const number = NumberTickets < 6 ? 6 : (NumberTickets - 1);

    return (
        <>
            <div className={style.gridNumbers}>
                {[...Array(6)].map((e, index) => <Button index={index}/>)}
                <Button index={number}/>
                {IsFirstSelect ?
                    <Button index={7}/>
                    :
                    <button onClick={handleOpen} className={style.number}>+</button>}

            </div>
            {/*display && <InputNumberTicket onConfirm={onClose}/>*/}
            <InputCheckbox props={chk}/>
        </>
    )

    function onChange() {
    }

    function handleOpen() {
    }

    function onClose() {
    }
}