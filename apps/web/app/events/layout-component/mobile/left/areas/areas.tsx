import style from "./style.module.css";
import {useLayoutContext} from "../../../index";
import Area from "./area";
import {MainContainer, IMainContainer} from "../main-container";
import u from "@repo/ui/misc"

export default function Areas({initialState}:{initialState?: boolean}) {
    const {Layout, AreaSelected} = useLayoutContext();
    const {Areas} = Layout;
    const sub = `Area seleccionada: ${AreaSelected.Name}`;
    const contProps: IMainContainer = {
        Title: "Areas",
        InitialState: initialState,
        IsActive: false
    }
    return (
        <MainContainer props={contProps}>
            <div className={style.gridA}>
                {Areas.map(e => <Area props={e}/>)}
            </div>
        </MainContainer>
    )
}