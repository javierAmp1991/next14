import MainContainerInfo from "./main-container-info";
import MaxTickets from "./max-tickets";
import {FileAndSeat, usePreviewContext} from "../../../";
import style from "./info.module.css";

const togetherText = " Los asientos estaran juntos";
const notTogetherText = " Los asientos no estaran juntos";

export default function RowAndSeatInfo() {
    const {ListFileAndSeat} = usePreviewContext();
    const haveOneOrMore = ListFileAndSeat.filter(e=>e.State).length > 1;
    const together = areTogether();
    return <>
        {
            haveOneOrMore &&  <MainContainerInfo icon={together}>
                <span className={`${!together && style.notTogether}`}> {together ? togetherText : notTogetherText}</span>
            </MainContainerInfo>
        }
       {/* <MaxTickets/>*/}
    </>

    function sortForSeat(a: { Seat: number }, b: { Seat: number }) {
        return a.Seat - b.Seat;
    }

    function areTogether() {
        const tickets: FileAndSeat[] = ListFileAndSeat.filter(e => e.State);
        let listFiles: string[] = [];
        tickets.forEach(t => {
            const findFile: string | undefined = listFiles.find(e => e === t.File);
            if (findFile === undefined) listFiles = [...listFiles, t.File]
        })
        if (listFiles.length > 1) return false;
        else {
            const orderList = tickets.sort(sortForSeat);
            for (let i = 1; i < orderList.length; i++) {
                if (orderList[i].Seat !== orderList[i - 1].Seat + 1) return false;
            }
            return true;
        }
    }
}