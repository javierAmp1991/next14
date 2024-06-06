//@ts-ignore
import style from "./cinema-mode.module.css";
import {CinemaModeProps} from "../cinema-mode-props";
import {EnumTypeResource, Resource} from "../../upload-resources";
import {useState} from "react";
import {createPortal} from "react-dom";
import {ID_PORTAL} from "../../const";
import Image from "next/image";
import {RETURN_ARROW} from "../../icons";

export const CinemaMobile = ({item, onClose}: { item: CinemaModeProps, onClose: Function }) => {
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

    return <>
        {
            createPortal(
                <div className={style.main}>
                    <div className={style.blackScreen}/>
                    <button onClick={handleClose} className={style.contButton}>
                        <div className={style.closeIcon}>
                            <Image alt="" layout={"fill"} src={RETURN_ARROW}/>
                        </div>
                    </button>

                    <div className={style.mainGrid}>
                        <div/>
                        {
                            (typeResourceSelected === EnumTypeResource.Image) &&
                            <>
                                {
                                    haveImages ?
                                        <div className={style.mainImage}>
                                            <Image alt="" layout={"fill"} objectFit={"contain"} src={sourceSelected.Source}/>
                                        </div>
                                        :
                                        <div className={style.noResource}>
                                            No hay imagenes disponibles
                                        </div>
                                }
                            </>

                        }
                        {
                            (typeResourceSelected === EnumTypeResource.YoutubeVideo) &&
                            <>
                                {
                                    haveVideos ?
                                        <iframe className={style.mainImage} allow="autoplay"
                                                src={`${sourceSelected.Source}?autoplay=1`}/>
                                        :
                                        <div className={style.noResource}>
                                            No hay videos disponibles
                                        </div>
                                }
                            </>
                        }
                        <div className={style.gridList}>
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
                            <div className={style.contList}>
                                {
                                    typeResourceSelected === EnumTypeResource.Image ?
                                        <>
                                            {
                                                haveImages ?
                                                    <>
                                                        {
                                                            images.map(item =>
                                                                <div onClick={() => handleResource(item.Id)}
                                                                     className={`${style.sideImage} 
                                         ${item.Id === sourceSelected.Id && style.selectedSource}`}>
                                                                    <Image alt="" layout={"fill"} src={item.Source}/>
                                                                </div>)
                                                        }
                                                    </>
                                                    :
                                                    <div className={style.noResourceAbsolute}>
                                                        No hay imagenes disponibles
                                                    </div>

                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                haveVideos ?
                                                    <>
                                                        {
                                                            yVideo.map(item =>
                                                                <div onClick={() => handleResource(item.Id)}
                                                                     className={`${style.sideImage} 
                                         ${item.Id === sourceSelected.Id && style.selectedSource}`}>
                                                                    <Image alt="" layout={"fill"} src={getThumbnail(item.Source)}/>
                                                                </div>)
                                                        }
                                                    </>
                                                    :
                                                    <div className={style.noResourceAbsolute}>
                                                        No hay videos disponibles
                                                    </div>

                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>, document.getElementById(ID_PORTAL)!
            )
        }
    </>

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

    function getThumbnail(link: string) {
        const videoId = link.split('/').pop();
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        return thumbnailUrl;
    }
}