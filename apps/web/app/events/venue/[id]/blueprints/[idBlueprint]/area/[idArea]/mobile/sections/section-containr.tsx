import {useAreaContext} from "../../provider";
import {EnumTypeArea, SectionsOptions } from "../../area-interfaces";
import style from "./section.module.css";
import u, { EnumSizeImageComponent, IImageComponent, ImageComponent } from "@repo/ui/misc";
import {MouseEvent} from "react";
import {usePopUpHook} from "@repo/ui/custom-hook";
import {EnumTypeResource, IUploadResources, UploadResources} from "@repo/ui/uploadResources";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import {IContainerWidthTitle, ImageDeleteView} from "@repo/ui/misc";
import {ContainerWidthTitle} from "@repo/ui/misc";
import {GetNameAndIconTypeSection} from "../../get-name-section";
import {EDIT_ICON_BLUE, TRASH_ICON_BLUE} from "@repo/ui/localIcons";


export default function SectionContainer({children, section}:{children: React.ReactNode, section:SectionsOptions}){
    const {Area, HaveEventActive, IsSimple, SectionHandlers, SectionForEdit} = useAreaContext();
    const {Name, Type, Color, Images} = section;
    const {State, HandleToggle} = usePopUpHook();
    const colorBorder = Area.Type === EnumTypeArea.Interactive ? "#3182c5" : Color;
    const border = {borderLeft: `.5rem solid ${colorBorder}`};
    const isSelected = section.Id === SectionForEdit?.Id;

    const typeName = GetNameAndIconTypeSection(section.Type);

    const {CinemaProps, CinemaState, HandleCloseCinema} = UseCinemaHook("Imagenes de referencia");
    const upload: IUploadResources = {
        Name: "",
        Link: "",
        Type: EnumTypeResource.Image,
        OnChange: ()=>{},
        Id: "",
        OnDelete: () => {
        },
        IsAvailable: true,
        PlaceholderText: " "
    };
    const totalImages = Images? Images.length : 0;
    const arrayLength = 4 - totalImages;
    const title: IContainerWidthTitle = {
        Title: "Imagenes de referencia",
        DontUseSpace: true,
        UseNormal: true
    };
    const iconEdit: IImageComponent = {
        Src: EDIT_ICON_BLUE,
        Use: EnumSizeImageComponent.use16
    };
    const iconDelete: IImageComponent = {
        Src: TRASH_ICON_BLUE,
        Use: EnumSizeImageComponent.use16
    };
    return(
        <>
        <div style={border} className={`${style.main} ${isSelected && style.selected}`}>
             <button onClick={handleClick} className={style.gridNameEditDelete}>
                 <b>{Name} <span className={style.type}>({typeName.Name})</span></b>
                 {
                     (IsSimple && !HaveEventActive) && 
                     <>
                        <button onClick={handleEdit}><ImageComponent props={iconEdit}/></button>
                        <button onClick={handlePopUp}><ImageComponent props={iconDelete}/></button>
                     </>
                 }
            </button>

            
            { State && <div className={style.contDisplay}>
                 {children}

                 { Images && <>
                    <ContainerWidthTitle props={title}>
                        <div className={style.gridImages}>
                            {Images.map(s => <ImageDeleteView Link={s} OnDelete={handleDeleteImage} OnClick={onClickImage} Id={s}/>)}
                            {[...Array(arrayLength)].map(() => <UploadResources props={upload}/>)}
                        </div>
                    </ContainerWidthTitle>
                 </>
                 }
            </div>
            }
        </div>

        {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}
    </>
    )
    
    function handleClick() {
        HandleToggle()
    }

    function handleEdit(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        SectionHandlers.SelectSectionForEdit(section)
    }
    
    function handleAccept() {

    }

    function handlePopUp(e: MouseEvent) {

    }

    function handleDeleteImage(){

    }

    function onClickImage(){

    }
}