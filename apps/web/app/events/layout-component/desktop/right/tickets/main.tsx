import style from "./style.module.css";
import References from "./reference-images/reference-images";
import Atributes from "./atributes/atributes";
import SectionInformation from "./section-info/section-info";
import Tickets from "./info-ticket/info-ticket";
import {HeaderContainer} from "../../header-container";

export default function Main({onReturn, areAllSame}:{onReturn: Function, areAllSame: boolean}){
    const props = {
        Title: areAllSame? "Tickets Seleccionados" : "Informacion de la Seccion",
        Action: "Volver a secciones",
        OnAction: onReturn
    }
    return(
        <HeaderContainer props={props}>
            {
                areAllSame ?
                <div className={style.main}>
                    <References/>
                    <SectionInformation/>
                    <Atributes/>
                    <Tickets/>
                </div>
                :
                <div className={style.main}>
                    <Tickets/>
                </div>
            }
        </HeaderContainer>
    )
}