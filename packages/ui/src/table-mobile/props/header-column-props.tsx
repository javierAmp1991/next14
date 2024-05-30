export interface HeaderColumBase {
    Name: string
    Type?: EnumTypeHeaderColum
}

export interface HeaderColumn extends HeaderColumBase {
}

export interface HeaderColumAscDes extends HeaderColumBase {
    From?: string
    To?: string
    IsAscending?: boolean
    HandleFilter: (state: EnumStateAscDes) => void
}

export enum EnumStateAscDes {
    Ascending, Descending
}

export interface HeaderColumNumericRange extends HeaderColumBase {
    IsCurrency?: boolean
    HandleFilter: (from: number, to: number) => void
}

export interface HeaderColumMultiple extends HeaderColumBase {
    Options: Options[]
    HandleFilter: (option: string) => void
}

export interface Options {
    Name: string
    State: boolean
}

export enum EnumTypeHeaderColum {
    AscDesc, NumRange, Multiple
}
