import { NotFoundDesktopContainer, INotFoundContainer} from "@repo/ui/misc";
import {useVenueContext} from "../provider";
import Main from "./main";
import {NOT_FOUND_PROPS} from "../const";


export default function Available(){
    const {CreateEditHandler} = useVenueContext();
    const {IsAvailable, IsSuccess} = CreateEditHandler.CreateEdit;
    const notFound: INotFoundContainer = {
        IsAvailable: IsAvailable,
        IsSuccess: IsSuccess,
        NotFoundPage: NOT_FOUND_PROPS
    };
   
    return  <NotFoundDesktopContainer props={notFound}><Main/></NotFoundDesktopContainer>
}