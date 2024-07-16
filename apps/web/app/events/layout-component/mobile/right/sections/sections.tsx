import {useLayoutContext} from "../../../index";
import style from "./section.module.css";
import Section from "./section";

export default function Sections(){
    const {AreaSelected} = useLayoutContext();
    return(
        <div className={style.grid}>
            {AreaSelected.Sections.map(s=><Section props={s}/>)}
        </div>
    )
}