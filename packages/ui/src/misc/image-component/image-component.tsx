//@ts-ignore
import style from "./style.module.css";
import { STRING_EMPTY } from "../../const";
import Image from "next/image";

export interface IImageComponent{
    Src: string
    Style?: string
    Priority?: boolean
    Alt?: string
    Use?: EnumSizeImageComponent | undefined
}

export enum EnumSizeImageComponent{
    use12, use14, use16
}

export const ImageComponent = ({props}:{props: IImageComponent}) => {
    const priority: boolean = props.Priority === undefined ? false : props.Priority;
    const alt: string = props.Alt || STRING_EMPTY;
    const nStyle: string = getStyle();

    return (
        <div className={`${style.main} ${nStyle} ${props.Style}`}>
            <Image alt={alt} priority={priority} layout={"fill"} objectFit={"cover"} src={props.Src}/>
        </div>
    )

    function getStyle(): string{
        if(props.Use === undefined) return `${style.default}`
        else if(props.Use === EnumSizeImageComponent.use12) return `${style.use12}`
        else if(props.Use === EnumSizeImageComponent.use14) return `${style.use14}`
        else if(props.Use === EnumSizeImageComponent.use16) return `${style.use16}`
        else return `${style.default}`
    }
}