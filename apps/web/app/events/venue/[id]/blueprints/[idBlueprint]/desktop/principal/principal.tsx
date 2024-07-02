import { MutationContainerShort, IMutationContainerShort, EnumMutationContainerShort} from "@repo/ui/mutationContainers";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {INPUT_CREATE_BLUPRINT} from "../../const";
import { GridDefaultCardMobile, GridDefaultCard } from "@repo/ui/defaultCard";
import { useBlueprintContext} from "../../provider";
import Area from "./areas/area";

export default function Principal(){
    const {IdBlueprint, IdVenue} = useBlueprintContext();
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
    };
    const AllAreas = [
        {
          Name: "Name 1",
          Image: "/venue-images/firstPlace.svg",
          Sections: 4,
          Id: "id001"
        },
        {
          Name: "Name 2",
          Image: "/venue-images/sausalito4.jpg",
          Sections: 3,
          Id: "id002"
        }
    ]
    return(
        <MutationContainerShort props={mutationShortProps}>
            <InputText props={inputName}/>
            <ContainerWidthTitle props={contTitle}>
            <GridDefaultCardMobile>
                {AllAreas.map((e) => (<Area e={e} idBlueprint={IdBlueprint} idVenue={IdVenue} />))}
            </GridDefaultCardMobile>
            </ContainerWidthTitle>
        </MutationContainerShort>
    )
}