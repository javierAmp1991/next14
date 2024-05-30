export interface WindowDimensionProps {
    Height?: number
    Width?: number
    RangeView: EnumTypeView
}

export enum EnumTypeView {
    Mobile, Desktop, Loading
}