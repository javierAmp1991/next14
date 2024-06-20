import { MutationContainerShort, IMutationContainerShort, EnumMutationContainerShort} from "@repo/ui/mutationContainers";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {INPUT_CREATE_BLUPRINT} from "../../const";
import Areas from "./areas/areas";

export default function Principal(){
    const mutationShortProps: IMutationContainerShort = {
        Type: EnumMutationContainerShort.Small
    };
    const inputName: IInputText = {
        Value: "",
        Name: INPUT_CREATE_BLUPRINT.Name,
        IsObligatory: true,
        TitleInput: INPUT_CREATE_BLUPRINT.Title,
        OnChange: ()=>{},
        Placeholder: INPUT_CREATE_BLUPRINT.Placeholder,
        IsDisable: false
    };
    const contTitle: IContainerWidthTitle = {
        Title: "Areas del plano",
        DontUseSpace: true
    }
    return(
        <MutationContainerShort props={mutationShortProps}>
            <InputText props={inputName}/>
            <ContainerWidthTitle props={contTitle}>
               <Areas/>
            </ContainerWidthTitle>
        </MutationContainerShort>
    )
}