import css from "../section.module.css";
import { EnumStyleCustomInput } from "@repo/ui/customInputs";
import {IInputNumber, IInputText, InputNumber, InputText, InputTextChangeEvent} from "@repo/ui/customInputs";
import {ImageComponent, IImageComponent, EnumSizeImageComponent} from "@repo/ui/misc";
import {IChair} from "../../../area-interfaces";
import { TRASH_ICON } from "@repo/ui/localIcons";

export default function Tables({HaveEventActive, OnDelete, OnEdit, OnMin,  OnName, C, IsShared}: IChair) {
    const chair: IInputNumber = {
        Name: "",
        Placeholder: "Sillas para la mesa",
        Value: `${C.Chair}`,
        IsObligatory: true,
        Style: css.input,
        OnChange: handleEdit,
        IsDisable: HaveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const min: IInputNumber = {
        Name: "",
        Placeholder: "para reservar",
        Value: ``,
        IsObligatory: true,
        OnChange: handleMin,
        Style: css.input,
        IsDisable: HaveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const table: IInputText = {
        Name: "",
        Placeholder: "Nombre de la mesa",
        Value: `${C.Table}`,
        IsObligatory: true,
        OnChange: handleEditName,
        Style: css.input,
        IsDisable: HaveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const icon: IImageComponent = {
        Src: TRASH_ICON,
        Use: EnumSizeImageComponent.use14
    }
    return (
        <div className={`${!IsShared ? css.gridFileAndSeatDelete3 : css.gridFileSeatDelete}`}>
            <div className={css.gridInput}>
                <InputText props={table}/>
            </div>
            <div className={css.gridInput}>
                Silla
                <InputNumber props={chair}/>
            </div>
            {
                !IsShared &&
                <div className={css.gridInput}>
                    Minimo
                    <InputNumber props={min}/>
                </div>
            }
            <button onClick={handleDeleteFile}>
                <ImageComponent props={icon}/>
            </button>
        </div>
    )

    function handleDeleteFile() {
        if (!HaveEventActive) OnDelete(C.Id)
    }

    function handleEdit(e: InputTextChangeEvent) {
        OnEdit(C.Id, e.Event.target.valueAsNumber)
    }

    function handleMin(e: InputTextChangeEvent) {
        OnMin(C.Id, e.Event.target.valueAsNumber)
    }

    function handleEditName(e: InputTextChangeEvent) {
        OnName(C.Id, e.Event.target.value)
    }
}