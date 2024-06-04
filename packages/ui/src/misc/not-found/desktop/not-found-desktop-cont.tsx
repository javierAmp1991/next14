import { SpinLoading } from "../../spin-loading/spin-loading";
import {INotFoundContainer} from "../not-found-props";
import {NotFoundDesktop} from "./not-found-desktop";

export const NotFoundDesktopContainer = ({props, children}:{props: INotFoundContainer, children: React.ReactNode})=>{
    const {IsAvailable, IsSuccess, NotFoundPage} = props;
    return IsSuccess? IsAvailable? children : <NotFoundDesktop props={NotFoundPage}/>  : <SpinLoading/>
}