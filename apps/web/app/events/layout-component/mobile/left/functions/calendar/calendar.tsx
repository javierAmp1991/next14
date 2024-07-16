import {CalendarDesktop} from "@repo/ui/calendar";
import style from "./calendar.module.css";
import {useState} from "react";
import HourView from "../hour-view";
import {isSameDayFn} from "@repo/ui/functions";
import {useLayoutContext, EventDate} from "../../../../index";


export default function Calendar({onClose}: { onClose: Function }) {
    const {} = useLayoutContext();
    const DatesAvailable: EventDate[] = [
        {
            Id: "idDate001",
            Date: new Date(2024, 8, 10, 22,0,0)
        },
        {
            Id: "idDate001",
            Date: new Date(2024, 9, 10, 14,0,0)
        }
    ];
    const [show, setShow] = useState(false);
    const [hoursAvailable, setHoursAvailable] = useState<any[]>([]);
    const getDates = getDatesAvailable()
    return (
        <div className={style.main}>
            <div className={`${style.mainOptions} ${show && style.show}`}>
                <b>Horario</b>
                {hoursAvailable.map(e => <HourView onSelectHour={onClose} hour={e} isBlue={true}/>)}
            </div>
            <div className={style.contCalendar}>
                <CalendarDesktop datesAvailable={getDates} onSelectDate={handleSelect} onClose={handleClose}/>
            </div>
        </div>
    )

    function getDatesAvailable() {
        let newDates: Date[] = []
        if (DatesAvailable) DatesAvailable.forEach(d => {
            newDates = [...newDates, d.Date]
        })
        return newDates
    }

    function handleSelect(date?: Date) {
        if (date) {
            if (DatesAvailable) {
                let newList: any[] = []
                DatesAvailable.forEach(e => {
                    if (isSameDayFn(e.Date, date)) newList = [...newList, e]
                })
                setShow(true)
                setHoursAvailable(newList)
            }

        } else {
            setShow(false)
            setHoursAvailable([])
        }
    }

    function handleHourSelected() {

    }

    function handleClose() {
        onClose()
    }
}