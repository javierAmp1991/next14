import {EventsRowTable} from "../props";
import {useMainContext} from "../provider";
import {    ColumnEdit,    ColumnClick,    Column,    NumberTable,    FirstColumn} from "@repo/ui/tableMobile";

export default function EventsColumns({item}: { item: EventsRowTable }) {
    const {HandleOpenMutation, ShowIncome} = useMainContext();
    const icon = item.CoverImage || "";

    return (
        <>
            <FirstColumn image={icon} name={item.Name}/>

            <Column>
                {item.Rating}
                {/* <SampleRatingView num={item.Rating}/> */}
            </Column>

            <ColumnClick onClick={handleMutationDates}>
                <NumberTable number={item.TotalDates}/>
            </ColumnClick>

            <Column>
                {item.From.toLocaleDateString()}
            </Column>

            <Column>
                {item.To.toLocaleDateString()}
            </Column>

            <ColumnClick onClick={handleMutationIncome}>
                {ShowIncome ? /*<PriceView item={{Price: item.Income, useNormal: true}}/>*/ <span>${item.Income}</span> : <span>Privado</span>}
            </ColumnClick>

            <ColumnEdit post={"Evento"}/>
        </>
    )

    function handleMutationIncome() {
        //HandleOpenMutation(item.Id, TABS_EVENTS.Income.Position)
    }

    function handleMutationDates() {
        //HandleOpenMutation(item.Id, TABS_EVENTS.Dates.Position)
    }
}



