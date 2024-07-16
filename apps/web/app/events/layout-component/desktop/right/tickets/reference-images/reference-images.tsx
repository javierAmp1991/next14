import style from "./reference-images.module.css";
import utilities, {ImageComponent} from "@repo/ui/misc";
import {Resource, EnumTypeResource} from "@repo/ui/uploadResources";
import {UseCinemaHook, CinemaDesktop} from "@repo/ui/cinemaMode";

export default function ReferenceImages() {
    const {HandleCloseCinema, CinemaProps, HandleShowCinema, CinemaState} = UseCinemaHook("Imagenes de referencia");
    const listResource: Resource[] = [
    {
        Id: "id001",
        Source: "/venue-images/nightClub1.jpg",
        Type: EnumTypeResource.Image
    },
    {
        Id: "id002",
        Source: "/venue-images/nightClub2.jpg",
        Type: EnumTypeResource.Image
    },
    {
        Id: "id003",
        Source: "/venue-images/nightClub3.jpg",
        Type: EnumTypeResource.Image
    },
    {
        Id: "id004",
        Source: "/venue-images/nightClub4.jpg",
        Type: EnumTypeResource.Image
    }
    ]
    return (
        <>
            <div className={`${style.main}`}>
                <div className={utilities.subtitle}>Imagenes de referencia</div>
                <div className={style.gridImages}>
                    {listResource.map(i =>
                        <button onClick={() => handleClick(i.Id)}>
                            <ImageComponent props={{Src: i.Source}}/>
                        </button>
                    )}
                </div>
            </div>

            {CinemaState && <CinemaDesktop item={CinemaProps} onClose={HandleCloseCinema}/>}
        </>

    )

    function handleClick(id: string) {
        HandleShowCinema(listResource, id)
    }

}