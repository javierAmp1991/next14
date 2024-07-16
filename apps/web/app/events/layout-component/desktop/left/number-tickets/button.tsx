import style from "../../style.module.css";
import {useLayoutContext} from "../../../index";


export default function Button({index}: { index: number }) {
    const {} = useLayoutContext();
    const isOpenSection = false;
    const isSelected = (index + 1) === 1;
    const s = isSelected ? style.numberSelected : isOpenSection ? style.numberDisable : style.number
    return (
        <button onClick={() => handleTicket(index)} className={s}>
            {index + 1}
        </button>
    )

    function handleTicket(num: number) {
    }
}