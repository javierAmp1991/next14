//@ts-ignore
import style from "./style.module.css";
import {NavProps} from "../nav-desktop/index";
import Main from "./main-side/main";
import {useHeaderPageMobile} from "../header-page/index";
export const NavMobile = ({children, props, link}: {children: React.ReactNode, props: NavProps, link: string })=>{
    const {State, HandleState} = useHeaderPageMobile();
    const newState = false;
    return (
      <>
        {State && <div onClick={handleReturn} className={style.blackScreen} />}
        <div className={`${style.main} ${State && style.translate}`}>
          <div onClick={handleReturn} className={style.cont}>
          <Main onGrid={()=>{}} isOpen={true} options={props.SectionOptions} title={props.Title} link={link}/>
          </div>
        </div>
        {children}
      </>
    );

    function handleReturn(){
        HandleState()
    }
}