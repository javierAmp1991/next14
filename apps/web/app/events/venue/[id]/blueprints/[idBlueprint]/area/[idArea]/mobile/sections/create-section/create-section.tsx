import style from "./create-section.module.css";
import {useState} from "react";
import {useAreaContext} from "../../../provider";
import {EnumTypeArea, RowSection, TableSection, FreeSpaceSection, ObjectSection, EnumTypeSection} from "../../../area-interfaces";
import {STRING_EMPTY} from "@repo/ui/const";
import {ROW_SECTION, TABLE_SECTION, FREE_SPACE_SECTION, OBJECT_SECTION} from "@repo/ui/localIcons";
import {InputText, IInputText, InputSelect, IInputSelect, IInputSelectOptions, EnumStyleCustomInput} from "@repo/ui/customInputs";
import {ContainerWidthTitle, ColorPicker, IColorPicker} from "@repo/ui/misc";
import {MainButton, IMainButton, EnumColorMainButton} from "@repo/ui/mainButton";

const defaultSection = {
    Name: STRING_EMPTY,
    Type: EnumTypeSection.Row,
    Id: "idDefault",
    Atributes: [],
    Images: []
};
const defaultColor = "#2394d7";
const ids = {
    FS: "id001",
    MS: "id003",
    EL: "id002",
    O: "id004"
}
const defaultOptions: IInputSelectOptions[] = [
    {
        Id: ids.FS,
        Name: "Filas y asientos",
        State: false,
        Image: ROW_SECTION,
    },
    {
        Id: ids.MS,
        Name: "Mesas y sillas",
        State: false,
        Image: TABLE_SECTION,
    },
    {
        Id: ids.EL,
        Name: "Espacio libre",
        State: false,
        Image: FREE_SPACE_SECTION,
    },
    {
        Id: ids.O,
        Name: "Objeto (Avanzado)",
        State: false,
        Image: OBJECT_SECTION,
    },
];

export default function CreateSection({onReturn}:{onReturn: Function}) {
    const {Area} = useAreaContext();
    const [section, setSection] = useState(defaultSection);
    const [newColor, setNewColor] = useState(defaultColor);
    const [options, setOptions] = useState<IInputSelectOptions[]>(defaultOptions);
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
    const buttonReturn: IMainButton = {
        OnClick: handleReturn,
        Text: "Volver",
        UseTiny: true,
        ColorButton: EnumColorMainButton.UseBorder
    };
    const select: IInputSelect = {
        Name: "Tipo de seccion",
        OnChange: handleSelect,
        Options: options,
        Style: style.select
    };
    const colorPicker: IColorPicker = {
        Color: newColor,
        HandleColor: handleColor
    };

    return (
        <div className={style.main}>
            <div className={style.submain}>
            <ContainerWidthTitle props={{Title: "Ingrese un nombre y seleccione el tipo", IsObligatory: true, DontUseSpace: true}}>
                <div className={style.gridInputs}>
                    <InputText props={inputName}/>
                    <InputSelect prop={select}/>
                </div>
            </ContainerWidthTitle>

            {Area.Type === EnumTypeArea.Simple && <ColorPicker props={colorPicker}/>}
            </div>

            <div className={style.gridButtons}>
                <MainButton props={button}/>
                <MainButton props={buttonReturn}/>
            </div>
        </div>
    )

    function handleName(e: any) {
        setSection({...section, Name: e.target.value})
    }

    function handleSelect(id: string) {
        const newOptions = options.map(e => {
            if (e.Id === id) {
                const newType = id === "id001" ? EnumTypeSection.Row
                    : id === "id002" ? EnumTypeSection.FreeSpace
                        : id === "id003" ? EnumTypeSection.Table
                            : EnumTypeSection.Object;
                setSection({...section, Type: newType})
                return {...e, State: true}
            } else return {...e, State: false}
        })
        setOptions(newOptions)
    }

    function handleCreate() {
        const findOption = options.find(e => e.State);
        if (findOption) {
            if (findOption.Id === ids.FS) {
                const newSection: RowSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Row,
                    Color: newColor,
                    Rows: [],
                    Images: section.Images
                }
                HandleCreateSection(newSection)
            } else if (findOption.Id === ids.MS) {
                const newSection: TableSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Table,
                    Color: newColor,
                    Tables: [],
                    Images: section.Images
                }
                HandleCreateSection(newSection)
            } else if (findOption.Id === ids.O) {
                const newSection: ObjectSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Object,
                    Color: newColor,
                    Objects: [],
                    Images: section.Images
                }
                HandleCreateSection(newSection)
            } else {
                const newSection: FreeSpaceSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.FreeSpace,
                    Color: newColor,
                    Capacity: 0,
                    Images: section.Images
                }
                HandleCreateSection(newSection)
            }
            setSection(defaultSection)
            setOptions(defaultOptions)
            setNewColor(defaultColor)
        }
    }

    function handleUploadResource(url: string) {
        // @ts-ignore
        setSection({...section, Images: [...section.Images, url]})
    }

    function handleDeleteImage(link: string) {
        const newLinks = section.Images.filter(e => e !== link)
        setSection({...section, Images: newLinks})
    }

    function HandleCreateSection(e: any){

    }

    function handleColor(newColor: string){
        setNewColor(newColor)
    }

    function handleReturn(){
        setSection(defaultSection)
        setOptions(defaultOptions)
        setNewColor(defaultColor)
        onReturn()
    }
};