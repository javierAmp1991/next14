import {InputNumber, IInputNumber, InputTextChangeEvent} from "@repo/ui/customInputs";
import {FreeSpaceSection} from "../../../area-interfaces";
import {ChangeEvent} from "react";
import {useAreaContext} from "../../../provider";
import SectionContainer from "../section-containr";
import {ContainerWidthTitle} from "@repo/ui/misc";

const names = {
    Seats: "seats",
    Amount: "amount"
};

export default function FreeSpace({section, onOpen}: { section: FreeSpaceSection, onOpen: Function }) {
    const {HaveEventActive, SectionHandlers} = useAreaContext();
    const {EditCapacityFromSectionItem} = SectionHandlers;
    const amount: IInputNumber = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Ingrese la cantidad",
        Value: section.Capacity === 0 ? "" : `${section.Capacity}`,
        OnChange: handleSeatAmount,
        IsDisable: HaveEventActive
    };

    return (
         <SectionContainer section={section}>
            <ContainerWidthTitle props={{Title: "Capacidad de la seccion", UseNormal: true}}>
             <InputNumber props={amount}/>
            </ContainerWidthTitle>
         </SectionContainer>
    )

    function handleSeatAmount(e: InputTextChangeEvent) {
        EditCapacityFromSectionItem(section.Id, "", e.Event.target.valueAsNumber)
    }
}