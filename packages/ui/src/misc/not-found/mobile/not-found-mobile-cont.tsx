import { SpinLoading } from "../../spin-loading/spin-loading";
import {INotFoundContainer} from "../not-found-props";
import {NotFoundMobile} from "./not-found-mobile";

export const NotFoundMobileContainer = ({props, children}:{props: INotFoundContainer, children: React.ReactNode})=>{
    const {IsAvailable, IsSuccess, NotFoundPage} = props;
    return IsSuccess? IsAvailable? children : <NotFoundMobile props={NotFoundPage}/>  : <SpinLoading/>
}