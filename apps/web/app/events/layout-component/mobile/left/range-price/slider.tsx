import React, {useCallback, useEffect, useState, useRef} from "react";
import style from "./slider.module.css";

const MultiRangeSlider = ({min, max, onChange}:{min: number, max:number, onChange: Function}) => {
    const [minVal, setMinVal] = useState<number>(min);
    const [maxVal, setMaxVal] = useState<number>(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({min: minVal, max: maxVal});
    }, [minVal, maxVal, onChange]);

    return (
        <div className={style.container}>
            <input type="range" min={min} max={max} value={minVal} onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
                minValRef.current = value;}}
                   className={`${style.thumb} ${style.thumbLeft}`}
                   style={{zIndex: 10000}}
            />
            <input type="range" min={min} max={max} value={maxVal} className={`${style.thumb} ${style.thumbRight}`}
                   onChange={(event) => {
                       const value = Math.max(Number(event.target.value), minVal + 1);
                       setMaxVal(value);
                       maxValRef.current = value;
                   }} style={{zIndex: 10000}}/>

            <div className={style.slider}>
                <div className={style.slider__track}/>
                <div ref={range} className={style.slider__range}/>
      {/*          <div className={style.slider__leftValue}>{minVal}</div>
                <div className={style.slider__rightValue}>{maxVal}</div>*/}
            </div>
        </div>
    );
};


export default MultiRangeSlider;