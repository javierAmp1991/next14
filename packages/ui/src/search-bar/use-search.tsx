import {ChangeEvent, useState} from "react";

export interface IUseSearch {
    Value: string
    IsSearching: boolean
    HandleChange: (e: ChangeEvent<HTMLInputElement>) => void
    HandleDeleteSearch: () => void
    HandleSearch: () => void
}

export function useSearch(onSearch: Function, onDeleteSearch: Function, initialValue?: string) {
    const [value, setValue] = useState<string>(initialValue || "");
    const [isSearching, setIsSearching] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        if (e.target.value === "") {
            onDeleteSearch()
            setIsSearching(false)
        }
    }

    function handleDeleteSearch() {
        setValue("")
        setIsSearching(false)
        onDeleteSearch()
    }

    function handleSearch() {
        setIsSearching(true)
        onSearch()
    }

    const UseSearchReturn: IUseSearch = {
        Value: value,
        IsSearching: isSearching,
        HandleChange: handleChange,
        HandleDeleteSearch: handleDeleteSearch,
        HandleSearch: handleSearch
    }

    return UseSearchReturn
}
