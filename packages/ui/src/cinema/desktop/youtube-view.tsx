//@ts-ignore
import style from "./cinema-mode.module.css";
import Image from "next/image";
import {Resource} from "../../upload-resources";

export default function YoutubeView({item, onClick, isSelected}:
                                        { item: Resource, onClick: Function, isSelected: boolean }) {
    const thumbnail = GetYoutubeInformation(item.Source).Thumbnail;
    return (
        <button className={style.gridVideoMini} onClick={handleResource}>
            <div  className={`${style.sideVideo} ${isSelected && style.selectedSource}`}>
                <Image alt="" layout={"fill"} src={thumbnail}/>
            </div>
            <div className={style.infoVideo}>
                <b>
                    Nombre del video de youtube
                </b>
                <div>
                    Duracion: 02:30
                </div>
            </div>
        </button>
    )

    function handleResource() {
        onClick(item.Id)
    }

    function GetYoutubeInformation(link: string) {
        let thumbnail = ""
        const videoId = obtainId(link)
        if (videoId !== null) thumbnail = `https://img.youtube.com/vi/${videoId}/default.jpg`;
        return {Thumbnail: thumbnail};
    }
    
    function obtainId(link: string) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = link.match(regExp);
        return match && match[7] ? match[7] : null;
    }
}