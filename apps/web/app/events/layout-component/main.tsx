import {LayoutProvider, ILayoutComponet} from "./index";
import Desktop from "./desktop/main";
import Mobile from "./mobile/main";

export const LayoutComponent = ({props}:{props: ILayoutComponet })=>{
    const {IsDesktop} = props;
    return(
        <LayoutProvider props={props}>
            {IsDesktop ? <Desktop/> : <Mobile/>}
        </LayoutProvider>
    )
}