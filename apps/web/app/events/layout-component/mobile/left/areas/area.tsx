import u, {ImageComponent, IImageComponent} from "@repo/ui/misc";
import {useLayoutContext} from "../../../index";
import style from "./style.module.css";
import {Areas} from "../../../index";


export default function Area({props}:{props: Areas}) {
    const {AreaSelected, AreaHandlers} = useLayoutContext();
    const {Id, Image, Name} = props;
    const styleImage = AreaSelected.Id === Id ? style.contSelected : style.contImage;
    const imageProps: IImageComponent = {
        Src: Image
    }
    return (
        <button onClick={handleArea} title={Name} className={style.contArea}>
            <div className={u.clamp1}>{Name}</div>
            <div className={styleImage}>
                <ImageComponent props={imageProps}/>
            </div>
        </button>
    )

    function handleArea() {
        AreaHandlers.SelectArea(Id)
    }
}