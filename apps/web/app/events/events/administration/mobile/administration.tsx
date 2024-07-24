import { IHeaderMobile, HeaderMobile } from "@repo/ui/headerDesktop";
import {DefaulContainerMobile} from "@repo/ui/mutationContainers";
import Table from "./table";
import {TITLE_SECTION, DESCRIPTION_SECTION, SEARCHBAR_PROPS} from "../../const";
import {useMainContext} from "../provider";
import {SearchBarMobile} from "@repo/ui/searchBar";
import css from "./administration.module.css";
import Image from "next/image";
import {LOCK_ICON_CIRCLE_BLUE, UNLOCK_ICON_CIRCLE_BLUE} from "@repo/ui/localIcons";

export default function Administration() {
    const {Search, HandleShowIncome, ShowIncome} = useMainContext();
      const headerProps: IHeaderMobile = {
        Title: TITLE_SECTION,
        Description: DESCRIPTION_SECTION,
    };
    const title = ShowIncome ? "Ocultar ingresos" : "Mostrar ingresos";

    return (
        <DefaulContainerMobile>
            <HeaderMobile props={headerProps}/>
            <SearchBarMobile props={Search} searchBarProps={SEARCHBAR_PROPS}/>
            <Table/>
            {/*<button title={title} className={css.contSwitch} onClick={handleSwitch}>
                <div className={css.image}>
                    <Image alt="" layout={"fill"} src={ShowIncome ? UNLOCK_ICON_CIRCLE_BLUE : LOCK_ICON_CIRCLE_BLUE}/>
                </div>
            </button>*/}
        </DefaulContainerMobile>
    )

    function handleCreate(){

    }

    function handleSwitch() {
        HandleShowIncome(!ShowIncome)
    }
}