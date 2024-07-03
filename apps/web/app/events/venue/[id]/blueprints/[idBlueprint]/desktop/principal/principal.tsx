import { MutationContainerShort, IMutationContainerShort, EnumMutationContainerShort} from "@repo/ui/mutationContainers";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {INPUT_CREATE_BLUPRINT} from "../../const";
import { GridDefaultCardMobile, CreateCardDesktop, IDefaultCard } from "@repo/ui/defaultCard";
import { useBlueprintContext} from "../../provider";
import Area from "./areas/area";

export default function Principal(){
    const {IdBlueprint, IdVenue, Blueprint, HandleName} = useBlueprintContext();
    const mutationShortProps: IMutationContainerShort = {
        Type: EnumMutationContainerShort.Small
    };
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
        DontUseSpace: true
    };
    const create: IDefaultCard = {
        First: "Crear nueva",
        Second: "Area del plano",
        Image: "",
        Href: `/events/venue/${IdVenue}/blueprints/${IdBlueprint}/area/createNewArea`
    };

    return(
        <MutationContainerShort props={mutationShortProps}>
            <InputText props={inputName}/>
            <ContainerWidthTitle props={contTitle}>
            <GridDefaultCardMobile>
                <CreateCardDesktop props={create}/>
                {Blueprint.Areas.map((e) => (<Area e={e} idBlueprint={IdBlueprint} idVenue={IdVenue} />))}
            </GridDefaultCardMobile>
            </ContainerWidthTitle>
        </MutationContainerShort>
    )
}