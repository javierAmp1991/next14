import {  IMutationContainerGrid} from "@repo/ui/mutationContainers";
import {
  InputText,
  IInputText,
  IInputCheckbox,
  InputCheckbox,
} from "@repo/ui/customInputs";
import { ContainerWidthTitle, IContainerWidthTitle, SeparationLine } from "@repo/ui/misc";
import { Map, IMapbox } from "@repo/ui/mapbox";
import { EnumTypeResource } from "@repo/ui/resourceTabContainer";
import { ImageRulesPopUp } from "@repo/ui/imagesRules";
import { UploadResources, IUploadResources } from "@repo/ui/uploadResources";
import style from "./style.module.css";

import { useState } from "react";
export default function Principal() {
  const containerProps: IMutationContainerGrid = {};
  const inputName: IInputText = {
    Name: "inputName",
    Value: "",
    IsObligatory: true,
    Placeholder: "Ingrese un nombre",
    TitleInput: "Nombre del recinto",
    OnChange: handleChange,
  };
  const inputPublic: IInputCheckbox = {
    Name: "",
    Value: true,
    Label:
      "¿Este recinto puede ser utilizado por otros productores de eventos?",
    OnChange: HandleIsPublic,
  };
  const [Enclosure, setEnclosure] = useState({ Address: undefined });
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
    OnChange: () => {},
    OnDelete: () => {},
    Type: EnumTypeResource.Image,
    IsAvailable: true,
    PlaceholderText: " ",
  };
  const inputFirst: IUploadResources = {
    Id: "",
    Link: "",
    Name: "",
    OnChange: () => {},
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

  const titleCheck: IContainerWidthTitle = {
    Title: "Utilizacion del recinto",
    DontUseSpace: true,
    IsObligatory: true,
  };

  return (
    <>
      <InputText props={inputName} />

      <ContainerWidthTitle props={titleProps}>
        <div className={style.cont}>
          <div className={style.gridImages}>
            <UploadResources props={inputFirst} />
            {[...Array(4)].map((e) => (
              <UploadResources props={inputUpload} />
            ))}
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
    </>
  );

  function handleChange() {}

  function HandleIsPublic() {}

  function getDataFromMap(data: any) {
    setEnclosure({ Address: data.features[0].place_name });
    /*
      data.features[0].place_name,
      data.features[0].center[0],
      data.features[0].center[1]
      */
  }
}
