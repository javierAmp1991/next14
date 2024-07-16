import MainContainerInfo from "./main-container-info";
import MaxTickets from "./max-tickets";
import {usePreviewContext} from "../../../";
import {TableAndChairSection} from "events.model";
import MinTickets from "./min-tickets";

const shared = " Las mesas son compartidas";
const noShared = " Las mesas no son compartidas";

export default function TableInfo({isShared}: { isShared: boolean | undefined }) {
    const {SectionSelected, ListFileAndSeat} = usePreviewContext();
    const maxTable = getLimit();
    const minTickets = getMinTickets();
    return <>
        <MainContainerInfo icon={true}>
            <span>{isShared ? shared : noShared}</span>
        </MainContainerInfo>
        {/* <MaxTickets max={maxTable}/>*/}
        {minTickets !== undefined && <MinTickets min={minTickets}/>}
    </>

    function getLimit() {
        /*  let total = TableSelected!.Chair;
          const cast = SectionSelected as TableAndChairSection;
          if (cast.Resale !== undefined && cast.Resale.length > 0) {
              const find = cast.Resale.find(e => e.Row === TableSelected!.Table);
              if (find) total -= find.Seat.length
          }
          if (cast.DisableAndReservedSeat !== undefined && cast.DisableAndReservedSeat.length > 0) {
              const find = cast.DisableAndReservedSeat.find(e => e.Row === TableSelected!.Table);
              if (find) total -= find.Seat.length
          }
          return total*/
        return 0
    }

    function getMinTickets() {
        if (SectionSelected) {
            const castSection = SectionSelected as TableAndChairSection;
            if (castSection.Tables.length === 0) return undefined;
            const ref = castSection.Tables[0];
            for (let i = 0; i < castSection.Tables.length; i++){
                if (castSection.Tables[i].Min !== ref.Min) return undefined
            }
            return ref.Min
        } else return undefined
    }
}