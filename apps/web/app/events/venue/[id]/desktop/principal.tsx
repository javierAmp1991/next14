import {
  IMutationContainerGrid,
  MutationContainerGrid,
  SubmutationContainerLeft,
  SubmutationContainerRight,
} from "@repo/ui/mutationContainers";
import {
  InputText,
  IInputText,
  IInputCheckbox,
  InputCheckbox,
} from "@repo/ui/customInputs";
import { ContainerWidthTitle, IContainerWidthTitle } from "@repo/ui/misc";
import { Map, IMapbox } from "@repo/ui/mapbox";
import {CinemaDesktop, UseCinemaHook} from "@repo/ui/cinemaMode";
import { EnumTypeResource } from "@repo/ui/resourceTabContainer";
import { ImageRulesPopUp } from "@repo/ui/imagesRules";
import { UploadResources, IUploadResources, Resource } from "@repo/ui/uploadResources";
import style from "./style.module.css";
import {useVenueContext} from "../provider";
import {CINEMA_TITLE} from "../const";

import { useState } from "react";
export default function Principal() {
  const {Venue, VenueHandlers} = useVenueContext();
  const [Enclosure, setEnclosure] = useState({ Address: undefined });
  const containerProps: IMutationContainerGrid = {};
  const {CinemaState, HandleCloseCinema, HandleShowCinema, CinemaProps} = UseCinemaHook(CINEMA_TITLE);
  const inputName: IInputText = {
    Name: "inputName",
    Value: Venue.Name,
    IsObligatory: true,
    Placeholder: "Ingrese un nombre",
    TitleInput: "Nombre del recinto",
    OnChange: handleChange,
  };
  const inputPublic: IInputCheckbox = {
    Name: "",
    Value: Venue.IsPublic,
    Label: "¿Este recinto puede ser utilizado por otros productores de eventos?",
    OnChange: VenueHandlers.HandleIsPublic
  };
  const mapProps: IMapbox = {
    IsActiveClickMap: true,
    IsActiveGeocoder: true,
    IsActiveMarker: true,
    IsActiveGeolocate: true,
    GetData: getDataFromMap,
    ReRender: true,
    ViewPort: undefined,
    Address: Enclosure.Address,
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
    Subtitle: "Una imagen principal obligatoria, maximo 4 extras",
  };
  const listInputLabels: IUploadResources[] = getInputLabels();

  const voidUpload = 5 - listInputLabels.length;


  return (
    <>
    <MutationContainerGrid props={containerProps}>
      <SubmutationContainerLeft>
        <InputText props={inputName} />
        <ContainerWidthTitle props={titleProps}>
          <div className={style.cont}>
            <div className={style.gridImages}>
              {listInputLabels.map(e=><UploadResources props={e}/>)}
              {[...Array(voidUpload)].map((e) => <UploadResources props={inputUpload} />)}
            </div>
            <div className={style.rules}>
              <ImageRulesPopUp />
            </div>
          </div> 
        </ContainerWidthTitle>
        <InputCheckbox props={inputPublic} />
      </SubmutationContainerLeft>
      <SubmutationContainerRight>
        <Map props={mapProps} />
      </SubmutationContainerRight>
    </MutationContainerGrid>
    {CinemaState && <CinemaDesktop onClose={HandleCloseCinema} item={CinemaProps}/>}
    </>
  );

  function handleChange() {}

  function getDataFromMap(data: any) {
    setEnclosure({ Address: data.features[0].place_name });
    /*
      data.features[0].place_name,
      data.features[0].center[0],
      data.features[0].center[1]
      */
  }

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
