type OnTransformFunction = (scale: number) => void;
type EmptyFunction = () => void;

export interface IControls {
    ZoomIn: Function
    ZoomOut: Function
    Reset: Function
    FullScreen?: boolean | undefined
    HandleFullScreen?: Function | undefined
}

export interface SvgViewProps {
    Src: string
    GoTo?: string
    Scale?: number
    OnLoad?: EmptyFunction | undefined
    OnExpandView?: EmptyFunction | undefined
    FullScreen?: boolean | undefined
    OnTransform?: OnTransformFunction | undefined
    OnRefresh?: EmptyFunction | undefined
    ShowRecommendation?: boolean
}