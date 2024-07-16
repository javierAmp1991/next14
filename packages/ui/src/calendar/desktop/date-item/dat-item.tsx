//@ts-ignore
import style from "../calendar-view.module.css";
import {getNumberDate} from "../../../functions";
import {isBefore, startOfDay, isAfter} from 'date-fns';

export default function DateItem({item, onSelectDate, Limit, DateSelected}:
                                     { item: Date, onSelectDate: Function, Limit?: Date, DateSelected?: Date }) {
    const isDateAvailable: boolean = isAvailable();
    const isSelected = item === DateSelected;

    return (
        <button onClick={handleSelectDate} className={`${style.items} ${!isDateAvailable && style.disable}`}>
            <div className={`${isSelected ? style.selected : style.datItem} ${isDateAvailable && style.isActive} `}>
                {getNumberDate(item)}
            </div>
        </button>
    )

    function handleSelectDate() {
        if (isDateAvailable) onSelectDate(item)
    }

    function isAvailable() {
        const isBeforeLimit = Limit === undefined ? false : isBefore(startOfDay(item), startOfDay(Limit));
        const isAfterToday = isAfter(startOfDay(item), startOfDay(new Date()));
        return (isAfterToday && isBeforeLimit)
    }
}