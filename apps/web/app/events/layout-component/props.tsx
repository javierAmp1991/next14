export interface ILayoutProvider {
    Event?: ILayoutEvent
    Layout: ILayout
    AreaHandlers: IAreaHandlers
    TicketHandlers: ITicketHandlers
    SvgHandlers: ISvgHandlers
    AreaSelected: Areas
    IsPublic: boolean
    Tickets: Ticket[]
}

export interface ISvgHandlers{
    OnFirstLoad: ()=>void
}

export interface ITicketHandlers{
    DeleteTicket: (t: Ticket)=>void
    SelectTicket: ()=>void
}

export interface ILayoutComponet {
    Event?: ILayoutEvent
    Layout: ILayout
    IsDesktop?: boolean
}

export interface IAreaHandlers{
    SelectArea: (id: string)=>void
}

export interface ILayoutEvent{
    Title: string
    Banner: string
    IsAdvanced?: boolean
    Dates: EventDate[]
}

export interface ILayout{
    Id: string
    Areas: Areas[]
}

export type SectionOptions = (RowSection | TableSection | FreeSpaceSection | ObjectSection)

export interface Areas{
    Id: string
    Name: string
    Image: string
    Sections: SectionOptions[]
}

export interface Sections{
    Id: string
    Name: string
    Color: string
    Type: EnumTypeSection
}

interface SectionItemBase{
    Id: string
}

export interface FreeSpaceSection extends Sections{
    Capacity: number
}

export interface RowSection extends Sections{
    Rows: RowItem[]
}

export interface RowItem extends SectionItemBase{
    Row: string
    Seat: number
}

export interface TableSection extends Sections{
    Tables: TableItem[]
    IsShared?: boolean
}

export interface TableItem extends SectionItemBase{
    Table: string
    Chair: number
    Min?: number
}

export interface ObjectSection extends Sections{
    Objects: ObjectItem[]
    IsShared?: boolean
}

export interface ObjectItem extends SectionItemBase{
    Object: string
    Capacity: number
    Min?: number
}

export enum EnumTypeSection{
    Row, Table, Object, FreeSpace
}

export interface Atributes {
    Id: string,
    Name: string
    Icon?: string
    Price?: number | undefined
    Description?: string
}

export interface Ticket {
    SectionName: string
    TypeSection: EnumTypeSection
    File: string
    Seat: number
    Price?: number
    Type: EnumTypeTicket
    StateSeat: EnumStateSeat
    State: boolean
    Alias?: string | undefined
    IsShared?: boolean | undefined
    Min?: number | undefined
}

export enum EnumStateSeat {
    Disable, Available, Reserved
}

export enum EnumTypeTicket{
    Standard, Resale
}

export interface EventDate {
    Date: Date
    Id: string
}

export interface GroupEventDates{
    Date: Date
    Dates: EventDate[]
}