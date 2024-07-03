import css from "../section.module.css";
import {IImageComponent, ImageComponent, EnumSizeImageComponent} from "@repo/ui/misc";
import {ISeat} from "../../../area-interfaces";
import {TRASH_ICON} from "@repo/ui/localIcons";
import {IInputText, IInputNumber, InputNumber, InputText, InputTextChangeEvent, EnumStyleCustomInput} from "@repo/ui/customInputs";

export default function Seats({S, OnDelete, OnEdit, OnName, HaveEventActive}: ISeat) {
    const seat: IInputNumber = {
        Name: "",
        Placeholder: "Asientos para esta fila",
        Value: `${S.Seat}`,
        IsObligatory: true,
        OnChange: handleEdit,
        Style: css.input,
        IsDisable: HaveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const file: IInputText = {
        Name: "",
        Placeholder: "Nombre de la fila",
        Value: `${S.Row}`,
        IsObligatory: true,
        OnChange: handleName,
        Style: css.input,
        IsDisable: HaveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const icon: IImageComponent = {
        Src: TRASH_ICON,
        Use: EnumSizeImageComponent.use16
    }

    return (
        <div className={css.gridFileSeatDelete}>
            <div className={css.gridInput}>
                <InputText props={file}/>
            </div>
            <div className={css.gridInput}>
                Asientos:
                <InputNumber props={seat}/>
            </div>
            <button onClick={handleDeleteFile}>
                <ImageComponent props={icon}/>
            </button>
        </div>
    )

    function handleDeleteFile() {
        if (!HaveEventActive) OnDelete(S.Id)
    }

    function handleEdit(e: InputTextChangeEvent) {
        OnEdit(S.Id, e.Event.target.valueAsNumber)
    }   

    function handleName(e: InputTextChangeEvent) {
        OnName(S.Id, e.Event.target.value)
    }
}