import css from "../section.module.css";
import {InputNumber, InputText, IInputNumber, IInputText, InputTextChangeEvent, EnumStyleCustomInput} from "@repo/ui/customInputs";
import {TRASH_ICON} from "@repo/ui/localIcons";
import {ImageComponent, IImageComponent, EnumSizeImageComponent} from "@repo/ui/misc";
import {ObjectItem} from "../../../area-interfaces";


export default function Objects({f, onDelete, onEdit, onMin, onName, haveEventActive, isShared}: {
    f: ObjectItem, onDelete: (file: string) => void,    onEdit: (file: string, capacity: number) => void,
    onName: (file: string, newName: string)=>void, haveEventActive: boolean, onMin: (file: string, min: number) => void,
    isShared: boolean
}) {
    const capacity: IInputNumber = {
        Name: "",
        Placeholder: "Sillas para la mesa",
        Value: `${f.Capacity}`,
        IsObligatory: true,
        OnChange: handleCapacity,
        Style: css.input,
        IsDisable: haveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const object: IInputText = {
        Name: "",
        Placeholder: "Nombre del objeto",
        Value: `${f.Object}`,
        IsObligatory: true,
        OnChange: handleEditName,
        Style: css.input,
        IsDisable: haveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine

    };
    const min: IInputNumber = {
        Name: "",
        Placeholder: "para reservar",
        Value: `${f.Min}`,
        IsObligatory: true,
        OnChange: handleMin,
        Style: css.input,
        IsDisable: haveEventActive,
        StyleInput: EnumStyleCustomInput.NoLine
    };
    const imageProps: IImageComponent = {
        Src: TRASH_ICON,
        Use: EnumSizeImageComponent.use16
    }
    return (
        <div className={`${!isShared ? css.gridFileAndSeatDelete3 : css.gridFileSeatDelete}`}>
            <div className={css.gridInput}>
                <InputText props={object}/>
            </div>
            <div className={css.gridInput}>
                Capacidad:
                <InputNumber props={capacity}/>
            </div>
            {
                !isShared &&
                <div className={css.gridInput}>
                    Minimo:
                    <InputNumber props={min}/>
                </div>
            }
            <button onClick={handleDeleteFile}>
                <ImageComponent props={imageProps}/>
            </button>
        </div>
    )

    function handleDeleteFile() {
        onDelete(f.Id)
    }

    function handleCapacity(e: InputTextChangeEvent) {
        onEdit(f.Id, e.Event.target.valueAsNumber)
    }

    function handleMin(e: InputTextChangeEvent) {
    }

    function handleEditName(e: InputTextChangeEvent) {
        onName(f.Id, e.Event.target.value)
    }
}