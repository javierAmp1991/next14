import style from "./functions.module.css";
import {getNumberDate, getNameMonth, getNameDay} from "@repo/ui/functions";
import HourView from "./hour-view";
//import {usePreviewContext} from "../../../";
import {MainButton, IMainButton} from "@repo/ui/mainButton";
import {GroupEventDates} from "../../../index";
import {useRouter} from "next/router";

export default function GroupDateView({prop, view, handleDisplay}:{ prop: GroupEventDates, view: boolean, handleDisplay: Function }) {
    //const {HandleDateSelected, DateSelected} = usePreviewContext();
    const DateSelected = new Date();
    const buttonCalendar: IMainButton = {
        OnClick: handleDisplay,
        Text: "Mas horarios",
        IsSquare: true,
        UseTiny: true
    };

    return (
        <div className={style.mainCal}>
            <div className={style.cal}>
                <div className={`${view ? style.date : style.hours}`}>
                    {getNameDay(prop.Date)} {getNumberDate(prop.Date)} {getNameMonth(prop.Date)}
                </div>
                {view &&
                    <div className={style.gridHours}>
                        {prop.Dates.map(h => {
                            const isSelected = h.Date === DateSelected;
                            return <HourView isSelected={isSelected} onSelectHour={handleDate} hour={h}/>
                        })}
                        {
                        prop.Dates.length > 1 && <MainButton props={buttonCalendar}/>}
                    </div>
                }
            </div>
        </div>
    )

    function handleDate(date: {Date: Date, Id: string}) {
        //router.push(`/event`, `/event/${date.Id}`).then()
        //HandleDateSelected(date.Date)
    }
}