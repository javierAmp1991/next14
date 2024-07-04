import css from "../section.module.css";
import {ObjectSection, ObjectItem} from "../../../area-interfaces";
import {useAreaContext} from "../../../provider";
import {ChangeEvent, useState} from "react";
import {IInputNumber, IInputText, InputNumber, InputText, IInputCheckbox, InputCheckbox, InputTextChangeEvent} from "@repo/ui/customInputs";
import {EnumColorMainButton, IMainButton, MainButton} from "@repo/ui/mainButton";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import SectionContainer from "../section-containr";
import Object from "./object";

const defaultObject = {
    Amount: 0,
    Object: "",
    Capacity: 0
};
const names = {
    Object: "object",
    Atribute: "atribute",
    Amount: "amount",
    Capacity: "capacity"
};

export default function ObjectSec({section, onOpen}: { section: ObjectSection, onOpen: Function }) {
    const {HaveEventActive, SectionHandlers} = useAreaContext();
    const {DeleteSectionItem, EditCapacityFromSectionItem, EditNameSectionItem, HandleAddNewItemToSection} = SectionHandlers;
    const [defaultFs, setDefaultFs] = useState(defaultObject);
    const object: IInputText = {
        Name: names.Object,
        IsObligatory: true,
        Placeholder: "Nombre del objeto",
        Value: `${defaultFs.Object}`,
        OnChange: handleSeatAmount,
        IsDisable: HaveEventActive
    };
    const amount: IInputNumber = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Cantidad",
        Value: defaultFs.Amount === 0 ? "" : `${defaultFs.Amount}`,
        OnChange: handleSeatAmount,
        IsDisable: HaveEventActive
    };
    const capacity: IInputNumber = {
        Name: names.Capacity,
        IsObligatory: true,
        Placeholder: "Capacidad",
        Value: defaultFs.Capacity === 0 ? "" : `${defaultFs.Capacity}`,
        OnChange: handleSeatAmount,
        IsDisable: HaveEventActive
    };
    const create: IMainButton = {
        Text: "Crear objeto",
        OnClick: handleCreateFiles,
        IsDisable: defaultFs.Amount === 0 || defaultFs.Capacity === 0 || defaultFs.Object === "",
        ColorButton: EnumColorMainButton.UseWhite,
        IsSquare: true,
        UseTiny: true
    };
    const alias: IInputText = {
        Name: "",
        Placeholder: "Ingrese un alias para el objeto",
        OnChange: ()=>{},
        Value: section.Alias ? section.Alias : "",
        IsObligatory: false,
        IsDisable: HaveEventActive
    };
    const isShared: IInputCheckbox = {
        Name: "",
        OnChange: handleEditShared,
        Value: section.IsShared ? section.IsShared : false,
        Label: "¿Estos objetos seran compartidos?"
    };
    const objectsTitle: IContainerWidthTitle = {
        Title: "Objetos de la seccion",
        UseNormal: true,
        DontUseSpace: true,
        UseGridForChildren: true
    }

    return (
        <SectionContainer section={section}>
            <ContainerWidthTitle props={{Title: "Alias de los objetos", UseNormal: true, DontUseSpace: true}}>
                <InputText props={alias}/>
            </ContainerWidthTitle>

            <ContainerWidthTitle props={{Title: "Crear objeto", UseNormal: true, DontUseSpace: true}}>
                <div className={css.createObject}>
                    <InputText props={object}/>
                    <InputNumber props={capacity}/>
                    <InputNumber props={amount}/>
                    <MainButton props={create}/>
                </div>
            </ContainerWidthTitle>

            <InputCheckbox props={isShared}/>

            {defaultFs.Amount}
            {defaultFs.Capacity}

            <ContainerWidthTitle props={objectsTitle}>
                {section.Objects.map((f)=><Object f={f} 
                haveEventActive={HaveEventActive}
                isShared={false}
                onDelete={handleDeleteObject}
                onEdit={handleEditObject}
                onMin={handleEditMin}
                onName={handleEditNameObject}
                />)}
            </ContainerWidthTitle>
        </SectionContainer>
    )

    function handleSeatAmount(e: InputTextChangeEvent) {
        if (e.Event.target.name === names.Object) setDefaultFs({...defaultFs, Object: e.Event.target.value})
        else if (e.Event.target.name === names.Capacity){
            if(e.Event.target.value === "") setDefaultFs({...defaultFs, Capacity: 0})
            else setDefaultFs({...defaultFs, Capacity: e.Event.target.valueAsNumber})
        }
        else {
            if(e.Event.target.value === "") setDefaultFs({...defaultFs, Amount: 0})
            else setDefaultFs({...defaultFs, Amount: e.Event.target.valueAsNumber})
        } 
    }

    function handleAlias(e: ChangeEvent<HTMLInputElement>) {
    }

    function handleCreateFiles() {
        const initial = section.Objects.length + 1;
        let objects = section.Objects;
        for (let i = initial + 1; i <= (initial + defaultFs.Amount); i++) {
            const newObject: ObjectItem = {
                Id: `Object${i}`,
                Object: `${defaultFs.Object} ${i}`,
                Min: defaultFs.Capacity,
                Capacity: defaultFs.Capacity
            };
            objects = [...objects, newObject]
        }
        const newSection = {...section, Objects: objects}
        HandleAddNewItemToSection(newSection)
        setDefaultFs(defaultObject)
    }

    function handleEditMin(file: string, min: number) {
    }

    function handleEditShared() {
    }

    function handleDeleteObject(row: string) {
        DeleteSectionItem(section.Id, row)
    }
    function handleEditObject(id: string, value: number) {
        EditCapacityFromSectionItem(section.Id, id, value)
    }
    function handleEditNameObject(id: string, newName: string) {
        EditNameSectionItem(section.Id, id, newName)
    }
}