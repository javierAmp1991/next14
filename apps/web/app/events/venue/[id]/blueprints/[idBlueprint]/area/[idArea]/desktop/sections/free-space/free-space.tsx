import css from "../section.module.css";
import {InputNumber, IInputNumber} from "@repo/ui/customInputs";
import {FreeSpaceSection} from "../../../area-interfaces";
import {ChangeEvent} from "react";
import {useAreaContext} from "../../../provider";
import SectionContainer from "../section-containr";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";

const names = {
    Seats: "seats",
    Amount: "amount"
};

export default function FreeSpace({section}: { section: FreeSpaceSection }) {
    const {HaveEventActive} = useAreaContext();
    const amount: IInputNumber = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Ingrese la cantidad",
        Value: section.Capacity === 0 ? "" : `${section.Capacity}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };

    return (
         <SectionContainer section={section}>
            <ContainerWidthTitle props={{Title: "Capacidad de la seccion", UseNormal: true}}>
             <InputNumber props={amount}/>
            </ContainerWidthTitle>
         </SectionContainer>
    )

    function handleSeatAmount(e: ChangeEvent<HTMLInputElement>) {
    }
}