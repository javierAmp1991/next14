//@ts-ignore
import style from "./style.module.css";
//@ts-ignore
import SVG from "react-inlinesvg";
import {TransformComponent, TransformWrapper, ReactZoomPanPinchContentRef} from "react-zoom-pan-pinch";
import {useEffect, useRef, useState} from "react";
import Controls from "./controls";
import Information from "./information";
import {SpinLoading} from "../../misc";
import Recommendation from "./recommendation/recommendation";
import {IControls, SvgViewProps} from "../props";

const maxScale = 10;
const defaultSize = {
    Width: 0,
    Height: 0,
    IsReady: false
};

export default function SvgComponent({props}: { props: SvgViewProps }) {
    const refCont = useRef<HTMLDivElement>(null);
    const ref = useRef<ReactZoomPanPinchContentRef>(null);
    const refresh = props.OnRefresh ? handleRefresh : undefined;
    const [size, setSize] = useState(defaultSize);
    const controlsProps: IControls = {
        ZoomIn: handleIn,
        ZoomOut: handleOut,
        Reset: handleReset,
        FullScreen: props.FullScreen,
        HandleFullScreen: props.OnExpandView
    };

    useEffect(() => {
        const handleResize = () => {
            if (refCont.current) {
                const newSize = {
                    Width: refCont.current.offsetWidth,
                    Height: refCont.current.offsetHeight,
                    IsReady: true,
                };
                setSize(newSize);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (props.GoTo) {
            const element = document.querySelector(props.GoTo);
            if (element && ref.current) {
                const scale = props.Scale ? props.Scale * 10 / 100 : undefined;
                // @ts-ignore
                ref.current.zoomToElement(element, scale);
            }
        } else handleReset()

    }, [props.GoTo]);

    return (
        <div ref={refCont} className={style.main}>
            {
                size.IsReady ?
                    <>
                        <Controls props={controlsProps}/>
                        <TransformWrapper  onTransformed={onTransformed} maxScale={maxScale} ref={ref}>
                            <TransformComponent>
                                <SVG  src={props.Src} height={size.Height} width={size.Width} onLoad={onLoad}/>
                            </TransformComponent>
                        </TransformWrapper>
                        <Information onRefresh={refresh}/>
                        <Recommendation/>
                    </>
                    :
                    <SpinLoading/>
            }
        </div>
    )

    function onTransformed(ref: ReactZoomPanPinchContentRef) {
        if (props.OnTransform) props.OnTransform(ref.instance.transformState.scale)
    }

    function handleIn() {
        if (ref.current) ref.current.zoomIn()
    }

    function handleOut() {
        if (ref.current) ref.current.zoomOut()

    }

    function onLoad() {
        if (props.OnLoad) props.OnLoad()
    }

    function handleReset() {
        if (ref.current) ref.current.resetTransform()
    }

    function handleRefresh() {
        if (props.OnRefresh) props.OnRefresh()
    }
}