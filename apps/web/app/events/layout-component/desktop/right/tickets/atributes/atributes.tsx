import style from "./atributes.module.css";
import Atribute from "./atribute";
import utilities from "@repo/ui/misc";
import {Atributes} from "../../../../index";
import {CHECK_ICON_GREEN, FREE_SPACE_SECTION, OBJECT_SECTION} from "@repo/ui/localIcons";

export default function AtributesC() {
    const A: Atributes[] = [
        {
            Id: "atr1",
            Name: "Atributo 1",
            Description: "Lorem ipsum dolorem enis enir illim",
            Icon: OBJECT_SECTION            
        },
        {
            Id: "atr2",
            Name: "Atributo 2",
            Description: "Lorem ipsum dolorem enis enir illim",
            Icon: CHECK_ICON_GREEN
        },
        {
            Id: "atr3",
            Name: "Atributo 3",
            Description: "Lorem ipsum dolorem enis enir illim",
            Icon: FREE_SPACE_SECTION        
        }
    ]
    return (
        <div className={`${style.main}`}>
            <div className={utilities.subtitle}>Atributos de la seccion</div>
            {A.map(s => <Atribute prop={s}/>)}
        </div>
    )
}