//@ts-ignore
import style from "./style.module.css";
import { HexColorPicker } from "react-colorful";
import {ContainerWidthTitle, IContainerWidthTitle} from "../index";

const DEFAUKT_COLOR = "#2394d7";
const DEFAULT_STYLE = { width: "100%", height: "160px" };

export interface IColorPicker{
    Color?: string
    HandleColor: (newColor: string)=> void
    Style?: {width: string, height: string}
}

export const ColorPicker = ({props}:{props: IColorPicker}) => {
    const {Color, HandleColor, Style} = props;
    const newStyle = Style || DEFAULT_STYLE;
    const newColor = Color || DEFAUKT_COLOR;
    const container: IContainerWidthTitle = {
      Title: "Seleccione un color",
      DontUseSpace: true,
      UseGridForChildren: true
    };
    return (
    <ContainerWidthTitle props={container}>
      <div className={style.contPicker}>
        <HexColorPicker
          style={newStyle}
          color={newColor}
          onChange={handleColor}
        />
      </div>

      <div className={style.color}>
        <div style={{ background: newColor }} className={style.square} />
        <span>Color seleccionado: {newColor}</span>
      </div>
    </ContainerWidthTitle>
  );

  function handleColor(e: string){
    HandleColor(e)
  }
};
