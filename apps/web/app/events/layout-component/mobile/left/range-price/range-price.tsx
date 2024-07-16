import style from "./slider.module.css";
import {useState} from "react";
import {MainContainer, IMainContainer} from "../main-container";
import MultiRangeSlider from "./slider";

export default function RangePrice() {
    const [price, setPrice] = useState({
        Min: 0,
        Max: 1
    });
    const containerProps: IMainContainer = {
        Title: "Rango de precio"
    }
    return (
        <MainContainer props={containerProps}>
            <div className={style.gridSlider}>
                <MultiRangeSlider min={0} max={10000} onChange={handleMinMax}/>
                <div className={style.gridMinMax}>
                    <div className={style.numb}>${price.Min}</div>
                    <div className={style.numb}>${price.Max}</div>
                </div>
            </div>
        </MainContainer>
    )

    function handleMinMax(range: any) {
        setPrice({Min: range.min, Max: range.max})
    }
}