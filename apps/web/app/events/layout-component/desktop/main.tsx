import Areas from "./left/main";
import Sections from "./right/main";
import Layout from "./svg/main";
import style from "./style.module.css";
import {useLayoutContext} from "../index";

export default function Main(){
    const {} = useLayoutContext();
    return(
        <div className={style.main}>
            <Areas/>
            <Layout/>
            <Sections/>
        </div>
    )
}