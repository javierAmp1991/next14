import {EventsRowTable} from "../props";
import {useMainContext} from "../provider";
import {TABS_EVENTS} from "../../const";
import {Column, ColumnClick, FirstColum, ColumnEdit, NumberTable} from "@repo/ui/tableDesktop";
import {} from "@repo/ui/misc";

export default function EventsColumns({item}: { item: EventsRowTable }) {
    const {HandleOpenMutation, ShowIncome} = useMainContext();
    const icon = item.CoverImage || "";

    return (
        <>
            <FirstColum image={icon} name={item.Name}/>

            <Column>
                {item.Rating}
                {/* <SampleRatingView num={item.Rating}/> */}
            </Column>

            <ColumnClick onClick={handleMutationDates}>
                <NumberTable number={item.TotalDates}/>
            </ColumnClick>

            <Column title={item.From.toLocaleDateString()}>
                {item.From.toLocaleDateString()}
            </Column>

            <Column title={item.To.toLocaleDateString()}>
                {item.To.toLocaleDateString()}
            </Column>

            <ColumnClick onClick={handleMutationIncome}>
                {ShowIncome ? /*<PriceView item={{Price: item.Income, useNormal: true}}/>*/<span>${item.Income}</span> : <span>Privado</span>}
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



