import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import Table from "./table";
import {ISearchBar, SearchBarMobile, useSearch} from "@repo/ui/searchBar";
import {DefaulContainerMobile} from "@repo/ui/mutationContainers";

export default function Main(){
    const headerProps: IHeaderMobile = {
      Title: "Administracion de recintos",
      Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    };
    const searchBarProps: ISearchBar = {
      Name: "searchVenue",
      Placeholder: "Buscar por nombre o direccion",
    };
    const searchProps = useSearch(onSearch, onDeleteSearch);
    
    return(
        <DefaulContainerMobile>
            <HeaderMobile props={headerProps}/>
            <SearchBarMobile props={searchProps} searchBarProps={searchBarProps}/>
            <Table/>
        </DefaulContainerMobile>
    )

    function onSearch() {}
    function onDeleteSearch() {}
}