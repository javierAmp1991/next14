import {IInputCheckbox, InputCheckbox} from "@repo/ui/customInputs";
import {IMainContainer, MainContainer} from "../main-container";

export default function Order() {
    const defaultType: IInputCheckbox = {
        OnChange: () => {
        },
        Label: "Menor a mayor",
        Value: true,
        Name: "",
    };
    const reType: IInputCheckbox = {
        OnChange: () => {
        },
        Label: "Mayor a menor",
        Value: false,
        Name: "",
    };
    const containerProps: IMainContainer = {
        Title: "Ordenar de"
    }
    return (
        <MainContainer props={containerProps}>
            <InputCheckbox props={defaultType}/>
            <InputCheckbox props={reType}/>
        </MainContainer>
    )
}