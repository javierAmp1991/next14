import css from "../section.module.css";
import {useAreaContext} from "../../../provider";
import {RowItem, RowSection} from "../../../area-interfaces";
import {ChangeEvent, useState} from "react";
import {IInputNumber, InputText, IInputText, InputNumber} from "@repo/ui/customInputs";
import {EnumColorMainButton, IMainButton, MainButton} from "@repo/ui/mainButton";
import {ContainerWidthTitle, IContainerWidthTitle} from "@repo/ui/misc";
import Seats from "./seats";
import SectionContainer from "../section-containr";

const defaultFileAndSeat = {
    Amount: 0,
    Seat: 0
};
const names = {
    Seats: "seats",
    Amount: "amount"
};

export default function Rows({section, onOpen}: { section: RowSection, onOpen: Function }) {
    const {HaveEventActive} = useAreaContext();
    const [defaultFs, setDefaultFs] = useState(defaultFileAndSeat);
    const seats: IInputNumber = {
        Name: names.Seats,
        IsObligatory: true,
        Placeholder: "Asientos por fila",
        Value: defaultFs.Seat === 0 ? "" : `${defaultFs.Seat}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const amount: IInputText = {
        Name: names.Amount,
        IsObligatory: true,
        Placeholder: "Numero de filas",
        Value: defaultFs.Amount === 0 ? "" : `${defaultFs.Amount}`,
        OnChange: ()=>{},
        IsDisable: HaveEventActive
    };
    const create: IMainButton = {
        Text: "Crear filas",
        OnClick: handleCreateFiles,
        IsDisable: HaveEventActive,
        UseTiny: true,
        IsSquare: true,
        ColorButton: EnumColorMainButton.UseBorder
    };
    const title: IContainerWidthTitle = {
        Title: "Crear Filas",
        UseNormal: true,
        DontUseSpace: true
    };
    const titleSeats: IContainerWidthTitle = {
        Title: "Filas y asientos de la seccion",
        UseNormal: true,
        DontUseSpace: true,
        UseGridForChildren: true
    }

    return (
        <SectionContainer section={section}>
            <ContainerWidthTitle props={title}>
                <div className={css.createFile}>
                   <InputNumber props={amount}/>
                   <InputText props={seats}/>
                   <MainButton props={create}/>
                </div>
            </ContainerWidthTitle>
            <ContainerWidthTitle props={titleSeats}>
                {section.Rows.map((s)=><Seats S={s} OnDelete={handleDeleteFile} OnEdit={handleEditFile} OnName={handleEditNameFile} HaveEventActive={HaveEventActive} />)}
            </ContainerWidthTitle>
        </SectionContainer>

    )

    function handleSeatAmount(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === names.Seats) setDefaultFs({...defaultFs, Seat: e.target.valueAsNumber})
        else setDefaultFs({...defaultFs, Amount: e.target.valueAsNumber})
    }

    function handleCreateFiles() {
        const initialIf = section.Rows.length + 1;
        let files = section.Rows;
        for (let i = initialIf; i < (initialIf + defaultFs.Amount); i++) {
            const newFile: RowItem = {
                SeatsDisable: [],
                Row: `Fila ${i}`,
                Id: `${i}`,
                Seat: defaultFs.Seat
            }
            files = [...files, newFile]
        }
        const newSection = {...section, Files: files}
        setDefaultFs(defaultFileAndSeat)
    }

    function findRowsWithFormat(collection: RowItem[]) {
        const regex = /Fila (\d+)/;
        const listRows = collection.filter(row => regex.test(row.Row));
        if (listRows.length === 0) return 1

        const numbers = listRows.map(row => {
            const match = row.Row.match(regex);
            return match ? parseInt(match[1]!) : null;
        });

        const validNumbers = numbers.filter(number => number !== null) as number[];

        if (validNumbers.length > 0) return (Math.max(...validNumbers) + 1);
        else return 1;
    }

    function handleDeleteFile(file: string) {

    }

    function handleEditFile(file: string, capacity: number) {

    }

    function handleEditNameFile(file: string, newName: string) {

    }
}