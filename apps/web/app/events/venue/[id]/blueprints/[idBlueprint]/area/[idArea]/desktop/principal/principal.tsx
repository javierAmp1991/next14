import style from "./style.module.css";
import {useAreaContext} from "../../provider";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import {UploadResources, IUploadResources, Resource, EnumTypeResource} from "@repo/ui/uploadResources";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {EnumMutationContainerShort, MutationContainerShort} from "@repo/ui/mutationContainers";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import {AREA_CONST} from "../../../const";


export default function Principal() {
    const {Area, AreaHandlers} = useAreaContext();
    const {EditName, AddLayout, DeleteLayout} = AreaHandlers;
    const inputName: IInputText = {
        Name: AREA_CONST.Main.Input.Name,
        Placeholder: AREA_CONST.Main.Input.Placeholder,
        Value: Area.Name,
        TitleInput: AREA_CONST.Main.Input.Title,
        OnChange: EditName,
        IsObligatory: AREA_CONST.Main.Input.IsObligatory
    };
    const inputImage: IUploadResources = {
        Name: AREA_CONST.Main.Resource.Name,
        Id: AREA_CONST.Main.Resource.Id,
        Link: Area.Blueprint,
        Type: AREA_CONST.Main.Resource.Type,
        OnChange: AddLayout,
        OnClick: handleShowCinema,
        IsAvailable: true,
        OnDelete: DeleteLayout
    };
    const {CinemaState, CinemaProps, HandleShowCinema, HandleCloseCinema} = UseCinemaHook(AREA_CONST.Main.Resource.TitleCinema);
    const titleBlueprint: IContainerWidthTitle = {
        Title: AREA_CONST.Main.Layout.Title,
        Subtitle: AREA_CONST.Main.Layout.Subtitle,
        DontUseSpace: true,
        IsObligatory: true
    };

    return (
        <MutationContainerShort props={{Type: EnumMutationContainerShort.Small}}>
            <InputText props={inputName}/>

            <ContainerWidthTitle props={titleBlueprint}>
                <div className={style.contResource}>
                    <UploadResources props={inputImage}/>
                </div>
            </ContainerWidthTitle>


            {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}

        </MutationContainerShort>
    )

    function handleShowCinema(){
        const newResource: Resource = {
            Id: "",
            Source: Area.Blueprint,
            Type: EnumTypeResource.Image
        }
        HandleShowCinema([newResource])
    }
}