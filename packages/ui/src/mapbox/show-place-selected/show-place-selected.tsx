//@ts-ignore
import style from "./style.module.css";
const SELECT_ADDRESS = "Seleccione una ubicacion en el mapa";
export const ShowPlaceSelected = ({address}:{address?: string})=>{
    return (
      <div className={style.main}>
        <span className={style.clamp1}>
          {address === undefined ? SELECT_ADDRESS : address}
          </span>
      </div>
    );
}