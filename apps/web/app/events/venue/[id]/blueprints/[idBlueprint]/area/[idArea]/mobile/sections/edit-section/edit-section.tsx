import style from "./create-section.module.css";
import {useState} from "react";
import {useAreaContext} from "../../../provider";
import {EnumTypeArea, SectionBase, RowSection, TableSection, ObjectSection, EnumTypeSection, FreeSpaceSection} from "../../../area-interfaces";
import {InputText, IInputText, EnumStyleCustomInput,  InputTextChangeEvent} from "@repo/ui/customInputs";
import {ContainerWidthTitle, ColorPicker, IColorPicker, ImageComponent, EnumSizeImageComponent} from "@repo/ui/misc";
import {MainButton, IMainButton, EnumColorMainButton} from "@repo/ui/mainButton";
import {GetNameAndIconTypeSection} from "../../../get-name-section";

export default function EditSection() {
    const {Area, SectionForEdit, SectionHandlers} = useAreaContext();
    const {SelectSectionForEdit, EditSection } = SectionHandlers;
    const initial = SectionForEdit as SectionBase
    const [section, setSection] = useState<SectionBase>(initial);
    const inputName: IInputText = {
        Name: "",
        IsObligatory: true,
        Placeholder: "Nombre de la seccion",
        Value: section.Name,
        OnChange: handleName,
        StyleInput: EnumStyleCustomInput.NoLine
    };
    const button: IMainButton = {
        OnClick: handleEditSection,
        Text: "Guardar edicion",
        UseTiny: true,
        IsDisable: section.Name === "" || section.Color === ""

    };
    const buttonCancel: IMainButton = {
        OnClick: handleCancelEdit,
        Text: "Cancelar edicion",
        ColorButton: EnumColorMainButton.UseWhite,
        UseTiny: true
    };
    const colorPicker: IColorPicker = {
        Color: section.Color,
        HandleColor: handleColor
    };
    const {Icon, Name} = GetNameAndIconTypeSection(section.Type);

    return (
        <div className={style.main}>
            <div className={style.submain}>
            <b style={{fontSize: 17}}>Editar seccion</b>
            <ContainerWidthTitle props={{Title: "Cambiar nombre de la seccion", IsObligatory: true, DontUseSpace: true}}>
                <div className={style.gridInputs}>
                    <InputText props={inputName}/>
                    <div className={style.gridType}>
                        <ImageComponent props={{Src: Icon, Use: EnumSizeImageComponent.use16}}/>
                        <div>{Name}</div>
                    </div>
                </div>
            </ContainerWidthTitle>

            {Area.Type === EnumTypeArea.Simple && <ColorPicker props={colorPicker}/>}
            </div>

            <div className={style.gridButtons}>
                <MainButton props={button}/>
                <MainButton props={buttonCancel}/>
            </div>
        </div>
    )

    function handleEditSection(){
        if(section.Type === EnumTypeSection.Row ) EditSection(section as RowSection)
        else if(section.Type === EnumTypeSection.Table ) EditSection(section as TableSection)
        else if(section.Type === EnumTypeSection.Object ) EditSection(section as ObjectSection)
        else if(section.Type === EnumTypeSection.FreeSpace ) EditSection(section as FreeSpaceSection)
    }

    function handleName(e:InputTextChangeEvent ) {
        setSection({...section, Name: e.Event.target.value})
    }
    function handleColor(newColor: string){
        setSection({...section, Color: newColor})
    }
    function handleCancelEdit(){
        SelectSectionForEdit()
    }
};