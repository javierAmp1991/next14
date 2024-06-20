import style from "./style.module.css";
import {useAreaContext} from "../../provider";
import {ChangeEvent, MouseEvent} from "react";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import {UploadResources, IUploadResources, EnumTypeResource} from "@repo/ui/uploadResources";
import {IPopUpContainer} from "@repo/ui/popUpContainer";
import {IInputText, InputText} from "@repo/ui/customInputs";
import {ContainerWidthTitle} from "@repo/ui/misc";


export default function Principal() {
    const {} = useAreaContext();
    const inputName: IInputText = {
        Name: "",
        Placeholder: "Ingrese el nombre del area",
        Value: "",
        TitleInput: "Nombre del area",
        OnChange: ()=>{},
        IsObligatory: true
    };
    const inputImage: IUploadResources = {
        Name: "",
        Id: "",
        Link: "",
        OnChange: ()=>{},
        Type: EnumTypeResource.Image,
        OnClick: () => {
        },
        IsAvailable: true,
        OnDelete: ()=>{}
    };
    const popup: IPopUpContainer = {
        Close: handleClosePopUp,
        UseTransparent: true,
        IsButton: false,
        DontUseBlackScreen: true
    };
    const {CinemaState, CinemaProps, HandleShowCinema, HandleCloseCinema} = UseCinemaHook("");

    return (
        <>
            <InputText props={inputName}/>

            <ContainerWidthTitle props={{Title: "Plano", DontUseSpace: true}}>
                <UploadResources props={inputImage}/>
            </ContainerWidthTitle>

            {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}

        </>
    )

    function handleDeleteAlt(link: string) {
    }

    function handleClick(id: string) {
    }

    function handleOpenRules(e: MouseEvent) {
    }

    function handleClose() {
    }

    function handleAddImage(link: string) {
    }

    function handleClosePopUp() {
    }

    function handleDelete() {
    }

    function handleName(e: ChangeEvent<HTMLInputElement>) {
    }
}