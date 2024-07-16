import {LayoutProvider, ILayoutComponet} from "./index";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";

export const LayoutComponent = ({props}:{props: ILayoutComponet })=>{
    const isDesktop = false;
    return(
        <LayoutProvider props={props}>
            {isDesktop ? <Desktop/> : <Mobile/>}
        </LayoutProvider>
    )
}