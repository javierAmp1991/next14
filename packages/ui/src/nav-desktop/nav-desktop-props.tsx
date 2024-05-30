export interface NavProps {
    SectionOptions: NavOptionsProps[]
    Title: string
}

export interface NavOptionsProps {
    UrlKey: string
    Id: string
    Name: string
    Icon: string
}