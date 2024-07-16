//@ts-ignore
import style from "../calendar-view.module.css";
import {getNumberDate} from "../../../functions";
import {isSameDay, isBefore, startOfDay, isAfter} from 'date-fns';

export default function DateItem({item, onSelectDate, Limit, Restrictions}:
                                     { item: Date, onSelectDate: Function, Limit?: Date, Restrictions: Date[] }) {
    const isDateAvailable: boolean = isAvailable();
    /*const colorBg = getColor();*/
    return (
        <button onClick={handleSelectDate} className={`${style.items}
         ${!isDateAvailable && style.disable}`}>
            <div className={`${style.datItem} ${isDateAvailable && style.isActive} `}>
                {getNumberDate(item)}
            </div>
        </button>
    )

    function handleSelectDate() {
        if (isDateAvailable) onSelectDate(item)
    }

    function isAvailable() {
        const isBeforeLimit = Limit === undefined ? false : isBefore(startOfDay(item), startOfDay(Limit));
        const isAvailableDate = Restrictions.find(e => isSameDay(startOfDay(e), startOfDay(item))) === undefined;
        const isAfterToday = isAfter(startOfDay(item), startOfDay(new Date()));
        return (isAvailableDate && isAfterToday && isBeforeLimit)
    }

    function getColor() {
        const day = item.getDay();
        if (day === 1 || day === 3 || day === 5 || day === 0) return true
        else return false
    }
}