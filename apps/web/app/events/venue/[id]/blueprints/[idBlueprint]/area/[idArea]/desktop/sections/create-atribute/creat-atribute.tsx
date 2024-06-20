import style from "./create-atribute.module.css";
import {ButtonWithIcon, ButtonWithIconProps, CustomInput, CustomInputProps} from "global.components";
import {ChangeEvent, useState} from "react";
import {Atributes} from "events.model";
import utilities from "global.functions/src/utilities.module.css";
import {useMutationAreaContext} from "../../../../../provider";
import {ulid} from "ulid";

const defaultAtribute: Atributes = {
    Id: "",
    Name: "",
    Description: "",
    Price: undefined,
    Icon: ""

};
const names = {
    Name: "name",
    Description: "description",
    Price: "price"
};

export default function CreatAtribute({state, onClose}: { state: boolean, onClose: Function }) {
    const {HandleCreateAtributes} = useMutationAreaContext();
    const [createAtribute, setCreateAtribute] = useState<Atributes>(defaultAtribute);
    const name: CustomInputProps = {
        Name: names.Name,
        OnChange: handleName,
        Value: createAtribute.Name,
        Placeholder: "ingrese un nombre",
        TypeInput: "text",
        IsObligatory: true,
        TitleInput: "Nombre del atributo"
    };
    const description: CustomInputProps = {
        Name: names.Description,
        OnChange: handleDescription,
        Value: createAtribute.Description || "",
        Placeholder: "ingrese una descripcion",
        TypeInput: "text",
        IsObligatory: false,
        TitleInput: "Descripcion del atributo",
        HeightTextArea: 80
    };
    const price: CustomInputProps = {
        Name: names.Price,
        OnChange: handleName,
        Value: createAtribute.Price ? `${createAtribute.Price}` : "",
        Placeholder: "ingrese el precio",
        TypeInput: "number",
        IsObligatory: false,
        TitleInput: "Costo agregado del atributo"
    };
    const create: ButtonWithIconProps = {
        Text: "Crear atributo",
        OnClick: handleCreate,
        Style: style.button
    };
    const returnButton: ButtonWithIconProps = {
        Text: "Volver",
        OnClick: handleClose,
        Style: style.button,
        IsBorder: true
    };
    return (
        <div className={`${style.main} ${state && style.open}`}>
            <p className={utilities.subTitle}>Crear atributo</p>
            <CustomInput item={name}/>
            <CustomInput item={description}/>
            <div className={style.gridButton}>
                <ButtonWithIcon prop={create}/>
                <ButtonWithIcon prop={returnButton}/>
            </div>
        </div>
    )

    function handleName(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === names.Name) setCreateAtribute({...createAtribute, Name: e.target.value})
        else setCreateAtribute({...createAtribute, Price: e.target.valueAsNumber})

    }

    function handleDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        setCreateAtribute({...createAtribute, Description: e.target.value})
    }

    function handleCreate() {
        const newAtribute: Atributes = {
            Name: createAtribute.Name,
            Price: createAtribute.Price,
            Description: createAtribute.Description,
            Id: ulid()
        };
        HandleCreateAtributes(newAtribute)
        onClose()
    }

    function handleClose() {
        onClose()
    }
}