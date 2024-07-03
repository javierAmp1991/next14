import style from "./create-section.module.css";
import {useState} from "react";
import {useAreaContext} from "../../../provider";
import {EnumTypeArea, RowSection, TableSection, FreeSpaceSection, ObjectSection, EnumTypeSection} from "../../../area-interfaces";
import {STRING_EMPTY} from "@repo/ui/const";
import {ROW_SECTION, TABLE_SECTION, FREE_SPACE_SECTION, OBJECT_SECTION} from "@repo/ui/localIcons";
import {InputText, IInputText, InputSelect, IInputSelect, IInputSelectOptions, EnumStyleCustomInput, InputTextChangeEvent} from "@repo/ui/customInputs";
import {ContainerWidthTitle, ColorPicker, IColorPicker} from "@repo/ui/misc";
import {MainButton, IMainButton, EnumColorMainButton} from "@repo/ui/mainButton";

const defaultSection: RowSection = {
    Name: STRING_EMPTY,
    Type: EnumTypeSection.Row,
    Id: "idDefault",
    Images: [],
    Color:"#2394d7",
    Rows: []
};
const ids = {
    FS: "id001",
    MS: "id003",
    EL: "id002",
    O: "id004"
};
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
    const {Area, SectionHandlers} = useAreaContext();
    const {AddSection} = SectionHandlers;
    const [section, setSection] = useState(defaultSection);
    const [options, setOptions] = useState<IInputSelectOptions[]>(defaultOptions);
    const findOption = options.find(e => e.State);
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
        UseTiny: true,
        IsDisable: findOption === undefined || section.Name === ""
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
        Color: section.Color,
        HandleColor: handleColor
    };

    return (
        <div className={style.main}>
            <div className={style.submain}>
                <b style={{fontSize: 17}}>
                    Crear seccion
                </b>
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

    function handleName(e: InputTextChangeEvent) {
        setSection({...section, Name: e.Event.target.value})
    }

    function handleCreate() {
        if (findOption) {
            if (findOption.Id === ids.FS) {
                const newSection: RowSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Row,
                    Color: section.Color,
                    Rows: [],
                    Images: section.Images
                };
                AddSection(newSection)
            } else if (findOption.Id === ids.MS) {
                const newSection: TableSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Table,
                    Color: section.Color,
                    Tables: [],
                    Images: section.Images
                };
                AddSection(newSection)
            } else if (findOption.Id === ids.O) {
                const newSection: ObjectSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.Object,
                    Color: section.Color,
                    Objects: [],
                    Images: section.Images
                };
                AddSection(newSection)
            } else {
                const newSection: FreeSpaceSection = {
                    Id: section.Name,
                    Name: section.Name,
                    Type: EnumTypeSection.FreeSpace,
                    Color: section.Color,
                    Capacity: 0,
                    Images: section.Images
                };
                AddSection(newSection)
            }
            setSection(defaultSection)
            setOptions(defaultOptions)
            onReturn()
        }
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

    function handleColor(newColor: string){
        setSection({...section, Color: newColor})
    }

    function handleReturn(){
        setSection(defaultSection)
        setOptions(defaultOptions)
        onReturn()
    }
};