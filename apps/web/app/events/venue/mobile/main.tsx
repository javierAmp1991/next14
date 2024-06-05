import {HeaderMobile, IHeaderMobile} from "@repo/ui/headerDesktop";
import Table from "./table";
import {SearchBarMobile} from "@repo/ui/searchBar";
import {DefaulContainerMobile} from "@repo/ui/mutationContainers";
import {useVenueProvider} from "../provider/index";
import {SEARCHBAR_PROPS, TITLE, DESCRIPTION} from "../const";

export default function Main(){
    const {Search} = useVenueProvider();
    const headerProps: IHeaderMobile = {
      Title: TITLE,
      Description: DESCRIPTION
    };
   
    return(
        <DefaulContainerMobile>
            <HeaderMobile props={headerProps}/>
            <SearchBarMobile props={Search} searchBarProps={SEARCHBAR_PROPS}/>
            <Table/>
        </DefaulContainerMobile>
    )

}