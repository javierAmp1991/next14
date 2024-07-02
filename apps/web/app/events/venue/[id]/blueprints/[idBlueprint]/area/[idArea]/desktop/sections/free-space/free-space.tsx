import {InputNumber, IInputNumber, InputTextChangeEvent} from "@repo/ui/customInputs";
import {FreeSpaceSection} from "../../../area-interfaces";
import {useAreaContext} from "../../../provider";
import SectionContainer from "../section-containr";
import {ContainerWidthTitle} from "@repo/ui/misc";

export default function FreeSpace({section}: { section: FreeSpaceSection }) {
    const {HaveEventActive, SectionHandlers} = useAreaContext();
    const {EditCapacityFromSectionItem} = SectionHandlers;
    const amount: IInputNumber = {
        Name: "",
        IsObligatory: true,
        Placeholder: "Ingrese la cantidad",
        Value: section.Capacity === 0 ? "" : `${section.Capacity}`,
        OnChange: handleCapacity,
        IsEmptyValueInvalid: true
    };

    return (
         <SectionContainer section={section}>
            <ContainerWidthTitle props={{Title: "Capacidad de la seccion", UseNormal: true}}>
             <InputNumber props={amount}/>
            </ContainerWidthTitle>
         </SectionContainer>
    )

    function handleCapacity(e: InputTextChangeEvent) {
        EditCapacityFromSectionItem(section.Id, "", e.Event.target.valueAsNumber)
    }
}