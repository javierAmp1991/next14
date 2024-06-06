import {
  InputText,
  IInputText,
  IInputCheckbox,
  InputCheckbox
} from "@repo/ui/customInputs";
import { ContainerWidthTitle, IContainerWidthTitle, SeparationLine } from "@repo/ui/misc";
import { Map, IMapbox } from "@repo/ui/mapbox";
import { EnumTypeResource } from "@repo/ui/resourceTabContainer";
import { ImageRulesPopUp } from "@repo/ui/imagesRules";
import { UploadResources, IUploadResources, Resource } from "@repo/ui/uploadResources";
import {CinemaMobile, UseCinemaHook} from "@repo/ui/cinemaMode";
import style from "./style.module.css";
import {useVenueContext} from "../provider";
import {CINEMA_TITLE} from "../const";


import { useState } from "react";
export default function Principal() {
  const {Venue, VenueHandlers} = useVenueContext();
  const {CinemaState, HandleCloseCinema, HandleShowCinema, CinemaProps} = UseCinemaHook(CINEMA_TITLE);

  const inputName: IInputText = {
     Name: "inputName",
     Value: Venue.Name,
     IsObligatory: true,
     Placeholder: "Ingrese un nombre",
     TitleInput: "Nombre del recinto",
     OnChange: VenueHandlers.HandleName,
  };
  const inputPublic: IInputCheckbox = {
    Name: "",
    Value: Venue.IsPublic,
    Label: "¿Este recinto puede ser utilizado por otros productores de eventos?",
    OnChange: VenueHandlers.HandleIsPublic
  };
  const [Enclosure, setEnclosure] = useState({ Address: undefined });
  
  const mapProps: IMapbox = {
    IsActiveClickMap: true,
    IsActiveGeocoder: true,
    IsActiveMarker: true,
    IsActiveGeolocate: true,
    ReRender: true,
    ViewPort: {
      Lat: Venue.Address.Lat,
      Lng: Venue.Address.Lng,
      Zoom: 15
    },
    Address: Venue.Address,
    GetAddress: VenueHandlers.HandlAddress
  };

  const inputUpload: IUploadResources = {
    Id: "",
    Link: "",
    Name: "",
    OnChange: VenueHandlers.HandleAddResource,
    OnDelete: () => {},
    Type: EnumTypeResource.Image,
    IsAvailable: true,
    PlaceholderText: " ",
  };

  const titleProps: IContainerWidthTitle = {
    Title: "Imagenes de referencia",
    DontUseSpace: true,
    IsObligatory: true,
    Subtitle: "Una imagen principal obligatoria, maximo 4.",
  };

  const titleMap: IContainerWidthTitle = {
    Title: "Ubicacion del recinto",
    DontUseSpace: true,
    IsObligatory: true,
    Subtitle: "Busque en el mapa la direccion del recinto",
  };

  const listInputLabels: IUploadResources[] = getInputLabels();
  const voidUpload = 5 - listInputLabels.length;

  return (
    <>
      <InputText props={inputName} />

      <ContainerWidthTitle props={titleProps}>
        <div className={style.cont}>
          <div className={style.gridImages}>
          {listInputLabels.map(e=><UploadResources props={e}/>)}
          {[...Array(voidUpload)].map((e) => <UploadResources props={inputUpload} />)}
          </div>
          <ImageRulesPopUp />
        </div>
      </ContainerWidthTitle>

      <InputCheckbox props={inputPublic} />

      <SeparationLine/>

      <ContainerWidthTitle props={titleMap}>
        <div style={{ width: "100%", aspectRatio: "1/1" }}>
          <Map props={mapProps} />
        </div>
      </ContainerWidthTitle>

      {CinemaState && <CinemaMobile onClose={HandleCloseCinema} item={CinemaProps}/>}
    </>
  );


  function getInputLabels(): IUploadResources[] {
    let listInputs: IUploadResources[] = [];
    const listImages = Venue.Resource.filter((e: any) => e.Type === EnumTypeResource.Image);
    listImages.forEach((r: Resource)=>{
      const newInput: IUploadResources = {
        Type: r.Type,
        Name: `nameResource${r.Id}`,
        Id: r.Id,
        Link: r.Source,
        IsAvailable: true,
        OnChange: VenueHandlers.HandleAddResource,
        OnDelete: VenueHandlers.HandleDeleteResource,
        OnClick: handleResource
    };
    listInputs = [...listInputs, newInput];
    })
    return listInputs
  }

  function handleResource(id: string){
    HandleShowCinema(Venue.Resource, id)
  }
}
