import style from "./functions.module.css";
import {convertHours} from "@repo/ui/functions";

export default function HourView({hour, onSelectHour, isSelected, isBlue}:
                                     { hour: {Date: Date, Id: string}, onSelectHour: Function, isSelected?: boolean, isBlue?: boolean | undefined }) {
    const horas = hour.Date.getHours();
    const minutos = hour.Date.getMinutes();
    const ampm = horas >= 12 ? "PM" : "AM";
    return (
        <button onClick={handleSelectHour} className={`${style.hours} ${isBlue && style.hourBlue} ${isSelected && style.selected}`}>
            {convertHours(`${horas}:${minutos}`)} {ampm}
        </button>
    )

    function handleSelectHour() {
        onSelectHour(hour)
    }
}