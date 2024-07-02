import style from "./images.module.css";
import {useAreaContext} from "../../provider";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import {UploadResources, IUploadResources, EnumTypeResource} from "@repo/ui/uploadResources";
import {EnumMutationContainerGrid, MutationContainerGrid} from "@repo/ui/mutationContainers";
import {IResourceTabContainer, ResourceTabContainer} from "@repo/ui/resourceTabContainer";
import {ImageDeleteView} from "@repo/ui/misc";
import {AREA_CONST} from "../../../const";

export default function Images() {
    const {Area, AreaHandlers} = useAreaContext();
    const {DeleteResource, AddResource} = AreaHandlers;
    const totalResource = Area.Resources.length;
    const totalArray = 4 - totalResource;
    const {CinemaProps, CinemaState, HandleCloseCinema, HandleShowCinema} = UseCinemaHook("");
    const upload: IUploadResources = {
        Id: AREA_CONST.Resources.Resource.Id,
        Name: AREA_CONST.Resources.Resource.Name,
        Link: AREA_CONST.Resources.Resource.Link,
        Type: AREA_CONST.Resources.Resource.Type,
        OnChange: AddResource,
        OnDelete: () => {},
        IsAvailable: true
    };
    const resourceTab: IResourceTabContainer = {
        OptionsResource: [
            {
                State: true,
                Id: "",
                Type: EnumTypeResource.Image,
                Text: AREA_CONST.Resources.Tab.Title
            }
        ],
        TotalResource: `${totalResource}${AREA_CONST.Resources.Tab.Complement}`,
        OnChange: () => {
        }
    };
    return (
        <>
            <MutationContainerGrid props={{UseDefaultPadding: true, Grid: EnumMutationContainerGrid.Rules}}>
                <ResourceTabContainer props={resourceTab}>
                    <div className={style.main}>
                        {Area.Resources.map(s => <ImageDeleteView Link={s.Source} OnDelete={DeleteResource} OnClick={onClickImage} Id={s.Id}/>)}
                        {[...Array(totalArray)].map(e => <UploadResources props={upload}/>)}
                    </div>
                </ResourceTabContainer>
                {/* <ImagesRules/> */}
            </MutationContainerGrid>

            {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}
        </>
    )
    
    function onClickImage(id: string){
        HandleShowCinema(Area.Resources, id)
    }
}