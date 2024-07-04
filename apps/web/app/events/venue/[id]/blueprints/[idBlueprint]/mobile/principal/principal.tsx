import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {INPUT_CREATE_BLUPRINT} from "../../const";
import Areas from "./areas/areas";
import {useBlueprintContext} from "../../provider";
import { CreateCardMobile, IDefaultCard } from "@repo/ui/defaultCard";

export default function Principal(){
    const {Blueprint, HandleName, IdBlueprint, IdVenue} = useBlueprintContext();
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
    };
    const create: IDefaultCard = {
        First: "Crear nueva",
        Second: "Area del plano",
        Image: "",
        Href: `/events/venue/${IdVenue}/blueprints/${IdBlueprint}/area/createNewArea`
    };
    return(
        <>
            <InputText props={inputName}/>
            <ContainerWidthTitle props={contTitle}>
               <CreateCardMobile props={create}/>
               <Areas/>
            </ContainerWidthTitle>
        </>
    )
}