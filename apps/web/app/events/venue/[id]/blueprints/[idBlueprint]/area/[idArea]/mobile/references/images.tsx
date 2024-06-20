import style from "./images.module.css";
import {useAreaContext} from "../../provider";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import {UploadResources, IUploadResources, EnumTypeResource} from "@repo/ui/uploadResources";
import {IResourceTabContainer, ResourceTabContainer} from "@repo/ui/resourceTabContainer";

export default function Images() {
    const {} = useAreaContext();
    const totalArray = 4 - 0;
    const {CinemaProps, CinemaState, HandleCloseCinema, HandleShowCinema} = UseCinemaHook("");
    const upload: IUploadResources = {
        Name: "",
        Link: "",
        Type: EnumTypeResource.Image,
        OnChange: ()=>{},
        Id: "",
        OnDelete: () => {
        },
        IsAvailable: true
    };
    const resourceTab: IResourceTabContainer = {
        OptionsResource: [
            {
                State: true,
                Id: "",
                Type: EnumTypeResource.Image,
                Text: "Imagenes de referencia"
            }
        ],
        TotalResource: `0/4`,
        OnChange: () => {
        }
    };
    return (
        <>
            <ResourceTabContainer props={resourceTab}>
                <div className={style.main}>
                    {[...Array(totalArray)].map(e => <UploadResources props={upload}/>)}
                </div>
            </ResourceTabContainer>
            {/* <ImagesRules/> */}
            {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}
        </>
    )

    function handleChange(link: string) {
    }

    function handleDelete(link: string) {
    }

    function handleClick(id: string) {
    }
}