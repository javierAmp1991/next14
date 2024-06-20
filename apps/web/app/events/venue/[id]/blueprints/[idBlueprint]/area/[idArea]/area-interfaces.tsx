export enum EnumTypeSection {
    Row, Table, FreeSpace, Object
}

export enum EnumTypeArea {
    Interactive, Simple
}

export type SectionsOptions = (RowSection | TableSection | ObjectSection | FreeSpaceSection)

export interface Area{
    Id: string
    Name: string
    Blueprint: string
    Type: EnumTypeArea
    Sections : SectionsOptions[]
}

export interface SectionBase {
    Id: string
    Type: EnumTypeSection
    Name: string
    Color: string
    Images?: string[]
}

interface SectionItemBase{
    Id: string
}

export interface RowSection extends SectionBase {
    Rows: RowItem[]
}

export interface RowItem extends SectionItemBase{
    Row: string
    Seat: number
    SeatsDisable: number[]
}

export interface TableSection extends SectionBase {
    IsShared?: boolean | undefined
    Tables: TableItem[]
}

export interface TableItem extends SectionItemBase{
    Table: string
    Chair: number
}

export interface ObjectSection extends SectionBase {
    Objects: ObjectItem[]
    Alias?: string | undefined
    IsShared?: boolean | undefined
}

export interface ObjectItem extends SectionItemBase{
    Object: string
    Capacity: number
    Min?: number | undefined
}

export interface FreeSpaceSection extends SectionBase {
    Capacity: number
}

export type ISeat = {
    S: RowItem
    OnDelete: (seat: string) => void
    OnEdit: (seat: string, capacity: number) => void
    OnName: (file: string, newName: string) => void
    HaveEventActive: boolean
}

export type IChair = {
    C: TableItem
    OnDelete: (id: string) => void
    OnEdit: (id: string, capacity: number) => void
    OnName: (id: string, newName: string) => void
    OnMin: (id: string, min: number) => void
    HaveEventActive: boolean
    IsShared: boolean
 }