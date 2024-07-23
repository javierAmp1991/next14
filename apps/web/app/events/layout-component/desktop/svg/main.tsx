import {SvgViewDesktop, SvgViewProps} from "@repo/ui/svgView";
import {useLayoutContext} from "../../index";
import Banner from "./banner";
import style from "./style.module.css";

export default function Main(){
    const {SvgHandlers, AreaSelected, IsPublic} = useLayoutContext();
    const {OnFirstLoad} = SvgHandlers;
    const props: SvgViewProps = {
        Src: AreaSelected.Image,
        OnLoad: OnFirstLoad
    }
    return (
        IsPublic?
        <SvgViewDesktop props={props} key={AreaSelected.Id}/>
        :
        <div className={style.main}>
            <Banner/>
            <SvgViewDesktop props={props} key={AreaSelected.Id}/>
        </div>
    )
}