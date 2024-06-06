//@ts-ignore
import style from "./cinema-mode.module.css";
import {Resource} from "../../upload-resources";
import Image from "next/image";

export default function ImageView({resource, onClick, isSelected}:
                                      { resource: Resource, onClick: Function, isSelected: boolean }) {
    return (
        <button onClick={handleResource} className={`${style.sideImage} ${isSelected && style.selectedSource}`}>
            <Image alt="" layout={"fill"} src={resource.Source}/>
        </button>
    )

    function handleResource() {
        onClick(resource.Id)
    }
}