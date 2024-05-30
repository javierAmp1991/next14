//@ts-ignore
import style from "./style.module.css";
import { useState } from "react";
import {IPopUpContainer, PopUpContainer} from "../popup-container";

const CONST_STRING = {
  Title: "Recursos del servicio",
  Resources: "Recursos",
  OptionVideo: {
    Id: "idVideo",
    Name: "Videos",
  },
  OptionImage: {
    Id: "idImage",
    Name: "Imagenes",
  }
};
const rules: string[] = [
  "No se permiten imagenes que infringan las reglas de Spix",
  "Solo se aceptan imagenes tipo .PNG, .JPG y .WEBP.",
  "Tamaño minimo 500px x 500px",
  "Tamaño maximo 1000px x 1000px",
  "Se recomienda que la imagen tenga una proporcion 1/1",
];
const RULES_RECOM = "Reglas y Recomendaciones";

export const ImagesRules = () => {
  return (
    <div className={style.main}>
      <div className={style.contTitle}>
        <div className={style.title}>{RULES_RECOM}</div>
      </div>
      <div className={style.recomendation}>
        {rules.map((item) => (
          <div className={style.rule}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export const ImageRulesPopUp = ()=>{
  const [show, setShow] = useState(false);
  const popUpProps: IPopUpContainer = {
    Close: handlePopUp, UseTransparent: true
  }
  return <>
      <button onClick={handlePopUp} className={style.rules}>{RULES_RECOM}</button>
      {show && <PopUpContainer props={popUpProps}><div className={style.popUp}><ImagesRules/></div></PopUpContainer>}
  </>
  
  function handlePopUp(){
     setShow(!show)
  }
}
