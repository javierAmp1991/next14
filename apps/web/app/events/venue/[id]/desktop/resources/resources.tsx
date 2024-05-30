import style from "./style.module.css";
import {MutationContainerGrid} from "@repo/ui/mutationContainers";
import {ImagesRules} from "@repo/ui/imagesRules";
import {EnumTypeResource, ResourceTabContainer, IResourceTabContainer} from "@repo/ui/resourceTabContainer";
import {UploadResources, IUploadResources} from "@repo/ui/uploadResources";

export default function Resources(){
    const resourceTab : IResourceTabContainer = {
        OptionsResource: [
          {
            State: true,
            Id: "",
            Type: EnumTypeResource.Image,
            Text: "Imagenes de referencia",
          },
        ],
        TotalResource: `0/4`,
        OnChange: () => {},
    };
    const inputUpload : IUploadResources = {
      Id: "",
      Link: "",
      Name: "",
      OnChange: ()=>{},
      OnDelete: ()=>{},
      Type: EnumTypeResource.Image,
      IsAvailable: true
    };      

    return (
        <MutationContainerGrid props={{Style: style.grid}}>
          <ResourceTabContainer props={resourceTab}>
            <div className={style.main}>
              <UploadResources props={inputUpload} />
              <UploadResources props={inputUpload} />
              <UploadResources props={inputUpload} />
              <UploadResources props={inputUpload} />
            </div>
          </ResourceTabContainer>
          <ImagesRules />
        </MutationContainerGrid>
    );
}