//@ts-ignore
import style from "../calendar-view.module.css";
import {getNumberDate} from "../../../functions";
import {isSameDay, isBefore, startOfDay, isAfter} from 'date-fns';

export default function DateItemAvailable({item, onSelectDate, Limit, DateSelected, DatesAvailable}: {
    item: Date, onSelectDate: Function, Limit?: Date | undefined, DateSelected?: Date | undefined, DatesAvailable: Date[]
}) {
    const isDateAvailable: boolean = isAvailable();
    const isSelected = getIsSelected();
    const styleDate = isSelected ? style.selected : isDateAvailable ? style.datItemAvailable : "";

    return (
        <button onClick={handleSelectDate} className={`${style.baseContDate} ${!isDateAvailable && style.disable}`}>
            <div className={`${style.baseDate} ${styleDate}`}>
                {getNumberDate(item)}
            </div>
        </button>
    )

    function handleSelectDate() {
        if (isDateAvailable) onSelectDate(item)
    }

    function getIsSelected() {
        if (DateSelected) return isSameDay(startOfDay(item), startOfDay(DateSelected))
        else return false
    }

    function isAvailable() {
        const isBeforeLimit = Limit === undefined ? false : isBefore(startOfDay(item), startOfDay(Limit));
        const isAvailableDate = DatesAvailable.find(e => isSameDay(startOfDay(e), startOfDay(item))) !== undefined;
        const isAfterToday = isAfter(startOfDay(item), startOfDay(new Date()));
        return (isAvailableDate && isAfterToday && isBeforeLimit)
    }
}