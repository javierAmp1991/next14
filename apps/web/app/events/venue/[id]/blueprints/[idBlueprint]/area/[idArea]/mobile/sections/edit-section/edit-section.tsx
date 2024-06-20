import style from "./create-section.module.css";
import {useState} from "react";
import {useAreaContext} from "../../../provider";
import {EnumTypeArea, SectionBase} from "../../../area-interfaces";
import {InputText, IInputText, EnumStyleCustomInput} from "@repo/ui/customInputs";
import {ContainerWidthTitle, ColorPicker, IColorPicker, ImageComponent, EnumSizeImageComponent} from "@repo/ui/misc";
import {MainButton, IMainButton, EnumColorMainButton} from "@repo/ui/mainButton";
import {GetNameAndIconTypeSection} from "../../../get-name-section";

const defaultColor = "#2394d7";

export default function EditSection() {
    const {Area, SectionForEdit, SectionHandlers} = useAreaContext();
    const initial = SectionForEdit as SectionBase
    const [section, setSection] = useState<SectionBase>(initial);
    const [newColor, setNewColor] = useState(defaultColor);
    const inputName: IInputText = {
        Name: "",
        IsObligatory: true,
        Placeholder: "Nombre de la seccion",
        Value: section.Name,
        OnChange: handleName,
        StyleInput: EnumStyleCustomInput.NoLine
    };
    const button: IMainButton = {
        OnClick: handleCreate,
        Text: "Crear seccion",
        UseTiny: true
    };
    const buttonCancel: IMainButton = {
        OnClick: handleCancelEdit,
        Text: "Cancelar edicion",
        ColorButton: EnumColorMainButton.UseWhite,
        UseTiny: true
    };
    const colorPicker: IColorPicker = {
        Color: newColor,
        HandleColor: handleColor
    };
    const {Icon, Name} = GetNameAndIconTypeSection(section.Type);

    return (
        <div className={style.main}>
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

            <div className={style.gridButtons}>
                <MainButton props={button}/>
                <MainButton props={buttonCancel}/>
            </div>
        </div>
    )

    function handleName(e: any) {
        setSection({...section, Name: e.target.value})
    }

    function handleCreate() {
    }
    

    function HandleCreateSection(e: any){

    }

    function handleColor(newColor: string){
        setNewColor(newColor)
    }

    function handleCancelEdit(){
        SectionHandlers.SelectSectionForEdit()
    }
};