import {useLayoutEffect, useState} from 'react';
import {EnumTypeView, WindowDimensionProps} from "./window-dimention-props";

export function useWindowDimensions(): WindowDimensionProps {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensionProps>({
        Width: undefined,
        Height: undefined,
        RangeView: EnumTypeView.Loading
    });
    useLayoutEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                Width: window.innerWidth,
                Height: window.innerHeight,
                RangeView: window.innerWidth > 1280 ? EnumTypeView.Desktop : EnumTypeView.Mobile
            });
        };

        setTimeout(()=>handleResize(), 1000)

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
}