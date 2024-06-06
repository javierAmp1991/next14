//@ts-ignore
import style from "./cinema-mode.module.css";
import {CinemaModeProps} from "../cinema-mode-props";
import {EnumTypeResource, Resource} from "../../upload-resources";
import {useState} from "react";
import {createPortal} from "react-dom";
import {ID_PORTAL} from "../../const";
import Image from "next/image";
import ImageView from "./image-view";
import YoutubeView from "./youtube-view";

export const CinemaDesktop = ({item, onClose}: { item: CinemaModeProps, onClose: Function }) => {
    const initialState: EnumTypeResource = item.ResourceSelected ? item.ResourceSelected.Type : EnumTypeResource.Image;
    const initialResource: Resource = item.ResourceSelected ? item.ResourceSelected : item.Resources[0]!;
    const images: Resource[] = item.Resources.filter(e => e.Type === EnumTypeResource.Image);
    const haveImages = images.length > 0;
    const yVideo: Resource[] = item.Resources.filter(e => e.Type === EnumTypeResource.YoutubeVideo);
    const haveVideos = yVideo.length > 0;
    const defaultOptions = [
        {
            Name: "Imagenes",
            Type: EnumTypeResource.Image,
            Id: "idImages001",
            State: initialState === EnumTypeResource.Image,
            IsVisible: haveImages
        },
        {
            Name: "Videos",
            Type: EnumTypeResource.YoutubeVideo,
            Id: "idVideoYoutube001",
            State: initialState === EnumTypeResource.YoutubeVideo,
            IsVisible: haveVideos
        }
    ];
    const [typeResourceSelected, setTypeResourceSelected] = useState(initialState);
    const [sourceSelected, setSourceSelected] = useState(initialResource);
    const [options, setOptions] = useState(defaultOptions);

    return (
        createPortal(
            <div className={style.main}>
                <div className={style.blackScreen}/>
                <div className={style.mainCont}>
                    <button onClick={handleClose} className={style.contButton}>
                        <div className={style.close}/>
                    </button>
                    <div className={style.gridOptions}>
                        {
                            options.map(item =>
                                item.IsVisible &&
                                <div onClick={() => handleTab(item.Id, item.Type)}
                                     className={`${style.options} ${item.State && style.selected}`}>
                                    {item.Name}
                                </div>
                            )
                        }
                    </div>
                    <div className={style.mainGrid}>
                        {
                            typeResourceSelected === EnumTypeResource.Image &&
                            <>
                                {
                                    haveImages ?
                                        <div className={style.mainImage}>
                                            <div className={style.mainImage2}>
                                                <Image alt="" layout={"fill"} objectFit={"contain"}
                                                       src={sourceSelected.Source}/>
                                            </div>
                                        </div>
                                        :
                                        <div className={style.noResource}>
                                            No hay imagenes disponibles
                                        </div>
                                }
                            </>

                        }
                        {
                            typeResourceSelected === EnumTypeResource.YoutubeVideo &&
                            <>
                                {
                                    haveVideos ?
                                        <iframe className={style.mainVideo} allow="autoplay"
                                                src={`${sourceSelected.Source}?autoplay=1`}/>
                                        :
                                        <div className={style.noResource}>
                                            No hay videos disponibles
                                        </div>
                                }
                            </>
                        }
                        <div className={style.gridList}>
                            <b className={style.name}>
                                {item.Name ? item.Name : "Sin nombre asignado"}
                            </b>
                            {
                                (typeResourceSelected === EnumTypeResource.Image && haveImages) &&
                                <div className={style.contList}>
                                    {
                                        images.map((item) =>
                                            <ImageView resource={item} onClick={handleResource}
                                                       isSelected={item.Id === sourceSelected.Id}/>)
                                    }
                                </div>
                            }
                            {
                                (typeResourceSelected === EnumTypeResource.YoutubeVideo && haveVideos) &&
                                <div className={style.contVideos}>
                                    {
                                        yVideo.map((item) =>
                                            <YoutubeView item={item} onClick={handleResource}
                                                         isSelected={item.Id === sourceSelected.Id}/>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>, document.getElementById(ID_PORTAL)!)

    )


    function handleResource(id: string) {
        const newItem = item.Resources.filter(e => e.Id === id)
        setSourceSelected(newItem[0]!)
        setTypeResourceSelected(newItem[0]!.Type)
    }

    function handleTab(id: string, type: EnumTypeResource) {
        const newList = options.map(item => {
            return item.Id === id ? {...item, State: true} : {...item, State: false}
        });
        setOptions(newList)
        if (type === EnumTypeResource.Image) {
            setTypeResourceSelected(EnumTypeResource.Image)
            setSourceSelected(images[0]!)
        } else {
            setTypeResourceSelected(EnumTypeResource.YoutubeVideo)
            setSourceSelected(yVideo[0]!)
        }
    }

    function handleClose() {
        onClose()
    }
}