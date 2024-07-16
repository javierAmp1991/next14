import {IMainContainer, MainContainer} from "../main-container";
import SelectNumber from "./select-number";

export default function NumberTickets() {
    const props: IMainContainer = {
        Title: "Numero de entradas"
    }
    return (
        <MainContainer props={props}>
            <SelectNumber/>
        </MainContainer>
    )
}