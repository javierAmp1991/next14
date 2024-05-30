//@ts-ignore
import style from "./style.module.css";

export interface IResourceTabContainer {
  TotalResource?: string
  OptionsResource: OptionTabResource[]
  OnChange: (id: string) => void
}

export interface OptionTabResource {
  Id: string
  Text: string
  State: boolean
  Type: EnumTypeResource
}

export enum EnumTypeResource {
  Image,  YoutubeVideo
}

const resourcesText = "Recursos";

export const ResourceTabContainer = ({children, props}:{ children: React.ReactNode, props: IResourceTabContainer }) => {
    return (
        <div className={style.contSection}>
            <div className={style.gridTabs} style={{gridTemplateColumns: `repeat(${props.OptionsResource.length}, max-content) 1fr`}}>
                {
                    props.OptionsResource.map(item =>
                        <div onClick={() => onChangeSelect(item.Id)} className={`${style.option} ${item.State && style.optionSelected}`}>
                            {item.Text}
                        </div>
                    )
                }
                {props.TotalResource && <div className={style.numberResource}>{resourcesText} {props.TotalResource}</div>}
            </div>
            {children}
        </div>
    )

    function onChangeSelect(id: string) {
      props.OnChange(id)
    }
}