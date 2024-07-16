import {Sections} from "../../../index";
import style from "./section.module.css";
import {useLayoutContext} from "../../../index";
import utilities from "@repo/ui/misc";
import {GetNameAndIconTypeSection} from "../../../index";

export default function SectionComp({props}: { props: Sections }) {
    const {} = useLayoutContext();
    //const totalAvailable = ListFileAndSeat.filter(e => e.SectionName === prop.Name && !e.State).length;
    const totalAvailable = 10;
    //const isSelected = SectionSelected === undefined ? false : SectionSelected.Name === prop.Name;
    const isSelected = false;
    const isPublic = false
    const colorBorder = props.Color === undefined ? "#1c232c" : props.Color;
    const borderSimple = {borderLeft: `.4rem solid ${colorBorder}`};
    const border = {borderLeft: `.4rem solid #3182c5`};
    const finalBorder = true? borderSimple : border;
    const name = getName();

    return (
        <div style={finalBorder} className={style.main} onClick={handleTicket} onMouseOver={handleOver}
             onMouseLeave={handleOut}>
            <div className={style.mainGrid}>
                <div className={style.gridAtributes}>
                    <b className={utilities.subtitle}>{props.Name}</b>
                    <span>{totalAvailable} entradas disponibles</span>
                    <span className={utilities.details}>{name}</span>
                </div>

                {isPublic &&
                    <div className={style.contPrice}>
                        <div>Precio</div>
                        {!isPublic && <div className={style.cada}>Precio agregado</div>}
                    </div>
                }
            </div>
        </div>
    )

    function handleTicket() {
    }

    function handleOver() {
    }

    function handleOut() {
    }

    function getName() {
        const name = GetNameAndIconTypeSection(props.Type);
        return name.Name
    }
}


