import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {INPUT_CREATE_BLUPRINT} from "../../const";
import Areas from "./areas/areas";
import {useBlueprintContext} from "../../provider";

export default function Principal(){
    const {Blueprint, HandleName} = useBlueprintContext();
    const inputName: IInputText = {
        Value: Blueprint.Name,
        Name: INPUT_CREATE_BLUPRINT.Name,
        IsObligatory: true,
        TitleInput: INPUT_CREATE_BLUPRINT.Title,
        OnChange: HandleName,
        Placeholder: INPUT_CREATE_BLUPRINT.Placeholder,
        IsDisable: false
    };
    const contTitle: IContainerWidthTitle = {
        Title: "Areas del plano",
        DontUseSpace: true,
        UseGridForChildren: true
    }
    return(
        <>
            <InputText props={inputName}/>
            <ContainerWidthTitle props={contTitle}>
               <Areas/>
            </ContainerWidthTitle>
        </>
    )
}