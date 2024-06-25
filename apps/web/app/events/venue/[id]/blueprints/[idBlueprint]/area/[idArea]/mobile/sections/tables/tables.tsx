import css from "../section.module.css";
import {useAreaContext} from "../../../provider";
import {TableSection} from "../../../area-interfaces";
import {ChangeEvent, useState} from "react";
import {IInputNumber, InputCheckbox, InputNumber, IInputCheckbox} from "@repo/ui/customInputs";
import {EnumColorMainButton, IMainButton, MainButton} from "@repo/ui/mainButton";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import Chairs from "./chairs";
import SectionContainer from "../section-containr";

const defaultFileAndSeat = {
    Amount: 0,
    Seat: 0
};
const names = {
    Chairs: "chairs",
    Amount: "amount"
};

export default function TableAndChairs({section, onOpen}: { section: TableSection, onOpen: Function }) {
    const {HaveEventActive}= useAreaContext();
    const [defaultFs, setDefaultFs] = useState(defaultFileAndSeat);
    const chairs: IInputNumber = {
        Name: names.Chairs,
        IsObligatory: true,
        Placeholder: "Numero de sillas",
        Value: defaultFs.Seat === 0 ? "" : `${defaultFs.Seat}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const amount: IInputNumber = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Cantidad de mesas",
        Value: defaultFs.Amount === 0 ? "" : `${defaultFs.Amount}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const create: IMainButton = {
        Text: "Crear mesas",
        OnClick: handleCreateFiles,
        ColorButton: EnumColorMainButton.UseWhite,
        IsDisable: HaveEventActive,
        IsSquare: true,
        UseTiny: true
    };
    const title: IContainerWidthTitle = {
        Title: "Crear Mesas",
        UseNormal: true,
        DontUseSpace: true
    };
    const titleChairs: IContainerWidthTitle = {
        Title: "Mesas y sillas de la seccion",
        UseNormal: true,
        DontUseSpace: true,
        UseGridForChildren: true
    };
    const isShared: IInputCheckbox = {
        Name: "",
        OnChange: handleEditShared,
        Value: section.IsShared ? section.IsShared : false,
        Label: "¿Estas mesas seran compartidas?"
    };
    const isSharedTable = section.IsShared? section.IsShared : false;

    return (
        <SectionContainer section={section}>
            <ContainerWidthTitle props={title}>
                <div className={css.createFile}>
                    <InputNumber props={amount}/>
                    <InputNumber props={chairs}/>
                    <MainButton props={create}/>
                </div>
            </ContainerWidthTitle>

            <div className={css.contFiles}>
                <InputCheckbox props={isShared}/>
            </div>

            <ContainerWidthTitle props={titleChairs}>
                {section.Tables.map(c => <Chairs 
                OnName={handleEditNameTable} 
                C={c} 
                OnDelete={handleDeleteTable} 
                IsShared={isSharedTable} 
                OnMin={handleEditMin} 
                OnEdit={handleEditTable} 
                HaveEventActive={HaveEventActive}/>)}
            </ContainerWidthTitle>
        </SectionContainer>   
    )

    function handleSeatAmount(e: ChangeEvent<HTMLInputElement>) {
    }

    function handleCreateFiles() {
    }

    function handleDeleteTable(file: string) {
    }

    function handleEditTable(file: string, capacity: number) {
    }

    function handleEditMin(file: string, min: number) {
    }

    function handleEditNameTable(file: string, newName: string) {
    }

    function handleEditShared() {
    }
}