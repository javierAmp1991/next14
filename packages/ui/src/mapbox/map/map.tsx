//@ts-ignore
import style from "./style.module.css";
import {IMapbox, Mapbox} from "./map-box";
const SELECT_ADDRESS = "Seleccione una ubicacion en el mapa";

export const Map = ({props}:{props: IMapbox})=>{
    return (
      <div className={style.mapContainer}>
        <Mapbox props={props} />
        <div className={style.address}>{props.Address? props.Address.Location : SELECT_ADDRESS}</div>
      </div>
    );
    
    
    
    
}