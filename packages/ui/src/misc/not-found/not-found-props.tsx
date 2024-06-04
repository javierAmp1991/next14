export interface INotFoundContainer{
    IsSuccess: boolean
    IsAvailable: boolean
    NotFoundPage: INotFound
}

export interface INotFound {
    Href: string
    Text: string
    ReturnText: string
}
