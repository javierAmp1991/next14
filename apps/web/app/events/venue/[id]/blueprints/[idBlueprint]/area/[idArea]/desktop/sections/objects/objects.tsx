import css from "../section.module.css";
import {ObjectSection} from "../../../area-interfaces";
import {useAreaContext} from "../../../provider";
import {ChangeEvent, useState} from "react";
import {IInputNumber, IInputText, InputNumber, InputText, IInputCheckbox, InputCheckbox} from "@repo/ui/customInputs";
import {EnumColorMainButton, IMainButton, MainButton} from "@repo/ui/mainButton";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import SectionContainer from "../section-containr";
import Object from "./object";

const defaultFileAndSeat = {
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
    const {HaveEventActive} = useAreaContext();
    const [defaultFs, setDefaultFs] = useState(defaultFileAndSeat);
    const object: IInputText = {
        Name: names.Object,
        IsObligatory: true,
        Placeholder: "Nombre del objeto",
        Value: `${defaultFs.Object}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const amount: IInputNumber = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Cantidad",
        Value: defaultFs.Amount === 0 ? "" : `${defaultFs.Amount}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const capacity: IInputNumber = {
        Name: names.Capacity,
        IsObligatory: true,
        Placeholder: "Capacidad",
        Value: defaultFs.Capacity === 0 ? "" : `${defaultFs.Capacity}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const create: IMainButton = {
        Text: "Crear objeto",
        OnClick: handleCreateFiles,
        IsDisable: false,
        ColorButton: EnumColorMainButton.UseBorder,
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
            <ContainerWidthTitle props={{Title: "Alias de los objetos", UseNormal: true}}>
                <InputText props={alias}/>
            </ContainerWidthTitle>

            <ContainerWidthTitle props={{Title: "Crear objeto", UseNormal: true}}>
                <div className={css.createObject}>
                    <InputText props={object}/>
                    <InputNumber props={capacity}/>
                    <InputNumber props={amount}/>
                    <MainButton props={create}/>
                </div>
            </ContainerWidthTitle>

            <InputCheckbox props={isShared}/>

            <ContainerWidthTitle props={objectsTitle}>
                {section.Objects.map((f)=><Object f={f} 
                haveEventActive={HaveEventActive}
                isShared={false}
                onDelete={handleDeleteObject}
                onEdit={handleEditObject}
                onMin={handleEditMin}
                onName={handleEditName}
                />)}
            </ContainerWidthTitle>
        </SectionContainer>
    )

    function handleSeatAmount(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === names.Object) setDefaultFs({...defaultFs, Object: e.target.value})
        else if (e.target.name === names.Capacity) setDefaultFs({...defaultFs, Capacity: e.target.valueAsNumber})
        else setDefaultFs({...defaultFs, Amount: e.target.valueAsNumber})
    }

    function handleAlias(e: ChangeEvent<HTMLInputElement>) {
    }

    function handleCreateFiles() {
    }

    function handleDeleteObject(object: string) {
    }

    function handleEditObject(object: string, capacity: number) {
    }

    function handleEditMin(file: string, min: number) {
    }

    function handleEditName(object: string, newName: string) {
    }

    function handleEditShared() {
    }
}