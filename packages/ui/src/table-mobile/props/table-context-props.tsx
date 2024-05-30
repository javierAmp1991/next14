export interface TableContextProps {
    AddRow: (index: number, height?: number) => void
    RemoveRow: (index: number) => void
}