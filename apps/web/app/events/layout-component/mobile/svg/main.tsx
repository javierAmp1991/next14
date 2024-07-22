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
    };
    const t = false;
    return (
        t?
        <div className={style.main}>
            <Banner/>
            <div className={style.contSvg}>
                <SvgViewDesktop props={props} key={AreaSelected.Id}/>
            </div>
        </div>
        :
        <div className={style.contSvg}>
            <SvgViewDesktop props={props} key={AreaSelected.Id}/>
        </div>
    )
}