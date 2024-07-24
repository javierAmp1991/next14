export interface EventsRowTable {
    Id: string
    CoverImage: string
    Name: string
    Rating: number
    Income: number
    From: Date
    To: Date
    TotalDates: number
}

export enum EnumTypeEvent {
    Normal,
    Multiple
}

export enum EnumStateEvent {
    Active,
    Inactive,
    Cancel,
    Finished
}