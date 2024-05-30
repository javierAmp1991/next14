export class PageChangeProps {
    private _preventDefault: boolean;
    public Page: number;
    public NextOrPrevious: boolean;

    constructor(public page: number, public nextOrPrevious: boolean = true) {
        this._preventDefault = true;
        this.Page = page;
        this.NextOrPrevious = nextOrPrevious;
    }

    preventNextPage() {
        this._preventDefault = !this._preventDefault;
    }

    isNextPagePrevented() {
        return this._preventDefault;
    }
}