//@ts-ignore
import style from "./style.module.css";
import { STRING_EMPTY } from "../../const";
import Image from "next/image";

export interface IImageComponent{
    Src: string
    Style?: string
    Priority?: boolean
    Alt?: string
    Use?: EnumSizeImageComponent
}

export enum EnumSizeImageComponent{
    use12, use14, use16
}

const mapeo: { [key: number]: string } = {
    [EnumSizeImageComponent.use12]: style.use12,
    [EnumSizeImageComponent.use14]: style.use14,
    [EnumSizeImageComponent.use16]: style.use16
};

export const ImageComponent = ({props}:{props: IImageComponent}) => {
    const priority: boolean = props.Priority === undefined ? false : props.Priority;
    const alt: string = props.Alt || STRING_EMPTY;
    const className: string = props.Use? mapeo[props.Use] : style.default;
    return (
        <div className={`${style.main} ${className} ${props.Style}`}>
            <Image alt={alt} priority={priority} layout={"fill"} objectFit={"cover"} src={props.Src}/>
        </div>
    )
}