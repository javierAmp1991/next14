import InputUploadVideo from "./video/input-upload-video";
import InputUploadImage from "./image/input-upload-video";

export interface IUploadResources {
  Type: EnumTypeResource;
  Id: string;
  Link: string;
  OnChange: (resource: Resource) => void;
  OnDelete: (id: string)=>void;
  OnClick?: (id: string)=>void;
  Name: string;
  IsAvailable: boolean;
  Placeholder?: string;
  PlaceholderText?: string;
  UseUpperPlaceholderText?: boolean;
  UseAspectRatio?: boolean;
}

export enum EnumTypeResource {
  Image,
  YoutubeVideo,
}

export interface Resource {
  Type: EnumTypeResource
  Source: string
  Id: string
}

export const UploadResources = ({ props }: { props: IUploadResources }) => {
  return (
    <>
      {props.Type === EnumTypeResource.Image && <InputUploadImage item={props} />}
      {props.Type === EnumTypeResource.YoutubeVideo && <InputUploadVideo item={props} />}
    </>
  );
};