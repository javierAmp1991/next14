import style from "./functions.module.css";
import {getNumberDate, getNameMonth, getNameDay} from "@repo/ui/functions";
//import {usePreviewContext} from "../../";

export default function DateView({date, onSelectDate}: { date: Date, onSelectDate: Function }) {
    //const {DateSelected} = usePreviewContext();
    const isSelected = false;
    return (
        <button onClick={handleSelectHour} className={`${style.hours} ${isSelected && style.selected}`}>
            {getNameDay(date)} {getNumberDate(date)} {getNameMonth(date)}
        </button>
    )

    function handleSelectHour() {
        onSelectDate(date)
    }
}