import {MainContainerDesktop, IMainContainerDesktop} from "@repo/ui/mainContainer";
const containerProps: IMainContainerDesktop = {};
export default function Page(){
    return(
        <MainContainerDesktop props={containerProps}>
            <div>Evento</div>
        </MainContainerDesktop>
    )
}