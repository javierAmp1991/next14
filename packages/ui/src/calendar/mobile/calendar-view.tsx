//@ts-ignore
import style from "./calendar-view.module.css";
import {useState} from "react";
import DateItem from "./date-item/dat-item";
import {IImageComponent, ImageComponent} from "../../misc";
import {RIGHT_ARROW_GRAY} from "../../icons";
import {getNameMonth, getNumberDate, getNameDay} from "../../functions/index";

const moment = require('moment');
const today: Date = new Date();

const weekDays = [
    'L', 'M', 'M', 'J', 'V', 'S', 'D'
];
const initialMonth = [
    {Name: "Enero", State: false, Number: 0},
    {Name: "Febrero", State: false, Number: 1},
    {Name: "Marzo", State: false, Number: 2},
    {Name: "Abril", State: false, Number: 3},
    {Name: "Mayo", State: false, Number: 4},
    {Name: "Junio", State: false, Number: 5},
    {Name: "Julio", State: false, Number: 6},
    {Name: "Agosto", State: false, Number: 7},
    {Name: "Septiembre", State: false, Number: 8},
    {Name: "Octubre", State: false, Number: 9},
    {Name: "Noviembre", State: false, Number: 10},
    {Name: "Diciembre", State: false, Number: 11}
];

export default function CalendarView({onSelectDate}: { onSelectDate: (date: Date) => void }) {
    const [dateSelected, setDateSelected] = useState({
        Days: getInitialDays(),
        Date: new Date(),
        AvailableNext: true,
        AvailablePrev: true
    });
    const restriction: Date[] = [];
    const limit: Date | undefined = new Date(2024, 10, 25);
    const leftArrow: IImageComponent = {
        Src: RIGHT_ARROW_GRAY,
        Style: dateSelected.AvailablePrev ? style.flip : style.flipDisable
    };
    const rightArrow: IImageComponent = {
        Src: RIGHT_ARROW_GRAY,
        Style: dateSelected.AvailableNext ? style.arrow : style.arrowDisable
    };
    return (
        <div className={style.grid}>
            <div className={style.contMont}>
                <div className={style.gridToday}>
                    <div className={style.numberToday}>
                        {getNumberDate(today)}
                    </div>
                    <div>
                        <div className={style.nameMonth}>
                            {getNameMonth(today)}
                        </div>
                        <div className={style.nameDay}>
                            {getNameDay(today)}
                        </div>
                    </div>
                </div>

                <div className={style.gridMonth}>
                    <button className={style.contArrow} onClick={handlePrevYear}>
                        <ImageComponent props={leftArrow}/>
                    </button>

                    <div className={style.year}>
                        <button className={`${style.yearSe} ${!dateSelected.AvailablePrev && style.noAv}`}
                                onClick={handlePrevYear}>
                            {dateSelected.Date.getFullYear() - 1}
                        </button>
                        <div>
                            {dateSelected.Date.getFullYear()}
                        </div>
                        <button className={`${style.yearSe} ${!dateSelected.AvailableNext && style.noAv}`}
                                onClick={handleNextYear}>
                            {dateSelected.Date.getFullYear() + 1}
                        </button>
                    </div>

                    <button className={style.contArrow} onClick={handleNextYear}>
                        <ImageComponent props={rightArrow} />
                    </button>
                </div>

                <div className={style.griAllMonth}>
                    {
                        initialMonth.map((e) =>
                            <button onClick={() => handleByMonth(e.Number)} className={`${style.month}
                                     ${(e.Number) === dateSelected.Date.getMonth() && style.monthSelected}`}>
                                <div className={style.calendar}>
                                    {
                                        e.Number > 8 ?
                                            <span>{e.Number + 1}</span>
                                            :
                                            <span>0{e.Number + 1}</span>
                                    }
                                </div>
                                {e.Name}
                            </button>
                        )
                    }
                </div>
            </div>

            <div className={style.main}>
                <div className={style.contDays}>

                    {
                        weekDays.map(e =>
                            <div className={style.days}>
                                {e}
                            </div>)
                    }
                </div>
                <div className={style.contDates}>
                    {
                        dateSelected.Days.map((item: Date) =>
                            <DateItem Restrictions={restriction} Limit={limit} onSelectDate={onSelectDate} item={item}/>
                        )
                    }
                    {
                        dateSelected.Days.length < 42 &&
                        [...Array(42 - dateSelected.Days.length)].map(e=>
                        <div className={style.itemEmpty}/>
                        )
                    }
                </div>
            </div>
        </div>
    )

    function getDays(refDate?: Date) {
        const date = moment(refDate ? refDate : new Date);

        const diasEnElMes = date.daysInMonth();

        let daysOfMonth: Date[] = [];

        for (let dia = 1; dia <= diasEnElMes; dia++) {
            const dateOfDay = moment(date).date(dia);
            daysOfMonth = [...daysOfMonth, dateOfDay.toDate()]
        }

        return daysOfMonth
    }

    function getPreviousWeekdaysUntilMonday(date: Date) {
        const inputDate = moment(date);

        const dayOfWeek = inputDate.day();

        if (dayOfWeek === 1) {
            return [];
        }

        const weekdays = [];

        while (inputDate.day() !== 1) {
            weekdays.unshift(inputDate.clone().subtract(1, 'day').toDate());
            inputDate.subtract(1, 'day');
        }

        return weekdays;
    }

    function getNextDaysUntilSunday(date: Date) {
        const inputDate = moment(date);

        const dayOfWeek = inputDate.day();

        if (dayOfWeek === 0) {
            return [];
        }

        const days = [];

        while (inputDate.day() !== 0) {
            days.push(inputDate.clone().add(1, 'day').toDate());
            inputDate.add(1, 'day');
        }

        return days;
    }

    function getInitialDays() {
        const newDays = getDays(new Date());
        const pevDays = getPreviousWeekdaysUntilMonday(newDays[0]!);
        const nextDays = getNextDaysUntilSunday(newDays[newDays.length - 1]!)
        return [...pevDays, ...newDays, ...nextDays]
    }

    function updateControls(date: Date) {
        const newDays = getDays(date);
        const pevDays = getPreviousWeekdaysUntilMonday(date);
        const nextDays = getNextDaysUntilSunday(newDays[newDays.length - 1]!)
        setDateSelected({
            ...dateSelected,
            Date: date,
            AvailableNext: true,
            AvailablePrev: true,
            Days: [...pevDays, ...newDays, ...nextDays]
        });
    }

    function handleNextYear() {
        if (dateSelected.AvailableNext) {
            const givenDate = moment(dateSelected.Date);
            const firstDayOfNextMonth = givenDate.clone().add(1, 'years').startOf('month').toDate();
            updateControls(firstDayOfNextMonth)
        }
    }

    function handlePrevYear() {
        if (dateSelected.AvailablePrev) {
            const givenDate = moment(dateSelected.Date);
            const firstDayOfPrevMonth = givenDate.clone().subtract(1, 'years').startOf('month').toDate();
            updateControls(firstDayOfPrevMonth)
        }
    }

    function handleByMonth(num: number) {
        const year = dateSelected.Date.getFullYear();
        const firstDay = moment({year, month: num}).startOf('month').toDate();
        updateControls(firstDay)
    }
}