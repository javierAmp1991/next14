import style from "../style.module.css";
import css from "./style.module.css";
import Areas from "./areas/areas";
import NumberTickets from "./number-tickets/number-tickets";
import Order from "./order/order";
import RangePrice from "./range-price/range-price";
import {useLayoutContext} from "../../index";
import { HeaderContainer } from "../header-container";
import Functions from "./functions/functions-event";

export default function Main(){
    const {IsPublic} = useLayoutContext();
    const props = {
        Title: "Filtros del evento",
        Action: "Restaurar filtros",
        OnAction: ()=>{}
    }
    return(
        IsPublic ?
        <div className={style.left}>
            <Areas initialState={true}/>
        </div>
        :
        <HeaderContainer props={props}>
            <Areas initialState={false}/>
            <NumberTickets/>
            <Order/>
            <RangePrice/>
            <Functions/>
        </HeaderContainer>        
    )
}