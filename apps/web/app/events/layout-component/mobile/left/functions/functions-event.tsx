import {MainContainer, IMainContainer} from "../main-container";
import {useState} from "react";
import {PopUpContainer, IPopUpContainer} from "@repo/ui/popUpContainer";
import GroupDateView from "./group-date-view";
import {convertDateFormat, convertToDate, isSameDate} from "@repo/ui/functions";
import {useRouter} from "next/router";
import { EventDate, GroupEventDates } from "../../../props";
import LazyCalendarHour from "./calendar/calendar";

export default function FunctionsEvent() {
    const DatesAvailable: EventDate[] = [
        {
            Id: "Id001",
            Date: new Date(2024, 7, 10, 10,30,0)
        },
        {
            Id: "Id002",
            Date: new Date(2024, 7, 10, 14,30,0)
        },
        {
            Id: "Id003",
            Date: new Date(2024, 10, 10, 12,30,0)
        },
        {
            Id: "Id004",
            Date: new Date(2024, 10, 10, 16,30,0)
        }
    ]
    const [display, setDisplay] = useState(false);
    const [displayDate, setDisplayDate] = useState(false);
    const dates = groupDates();
    const visualization = typeVisualization(dates);
    const props: IMainContainer = {
        Title: "Fechas"
    };
    const popUpContainer: IPopUpContainer = {
        Close: handleDisplay,
        IsButton: false,
        UseTransparent: true
    };

    return (
        <>
            <MainContainer props={props}>
                {dates.map(e => <GroupDateView handleDisplay={handleDisplay} prop={e} view={visualization}/>)}
            </MainContainer>
            {
                display &&
                <PopUpContainer props={popUpContainer}>
                    <LazyCalendarHour onClose={handleDate}/>
                </PopUpContainer>
            }
        </>
    )

    function handleDisplay() {
        setDisplay(!display)
    }

    function handleDate(date: {Date: Date, Id: string}) {
        //router.push(`/event`, `/event/${date.Id}`).then()
        //HandleDateSelected(date.Date)
    }

    function handleDisplayDate() {
        setDisplayDate(!displayDate)
    }

    function groupDates() {
        const result: GroupEventDates[] = [];
        if (DatesAvailable) {
            DatesAvailable.forEach(d => {
                const formatDate = convertDateFormat(d.Date, 'YYYY-MM-DD');
                //const exist = result.find(entry => moment(entry.Date).isSame(moment(formatDate), 'day'));
                const exist = result.find(entry => isSameDate(entry.Date, formatDate, 'day'));

                if (exist) {
                    if (!exist.Dates) exist.Dates = [];
                    exist.Dates.push(d);
                } else {
                    const formattedDate = convertToDate(d.Date);
                    result.push({Date: formattedDate, Dates: [d]});
                }
            });
        }
        return result;
    }

    function typeVisualization(dates: any[]) {
        return dates.find(d => d.Dates.length > 1) !== undefined
    }
}