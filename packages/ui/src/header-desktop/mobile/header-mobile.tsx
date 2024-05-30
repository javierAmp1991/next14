//@ts-ignore
import style from "./style.module.css";
import { useEffect, useRef, useState } from "react";

export interface IHeaderMobile {
  Title: string;
  Description: string;
}

export const HeaderMobile = ({ props }: { props: IHeaderMobile }) => {
  const [state, setState] = useState(true);
  const [moreLess, setMoreLess] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (ref.current) setMoreLess(ref.current.scrollHeight > ref.current.clientHeight)
  }, [])

  return (
    <div className={style.main}>
      <div className={style.gridTitleDescription}>
        <div className={style.title}>{props.Title}</div>
        <div ref={ref} className={`${style.description} ${moreLess && style.clamp3}`}>{props.Description}</div>
         {state && <div><button onClick={handleOpen} className={style.seeMore}>{moreLess ? "Ver mas" : "Ver menos"}</button></div>}
      </div>
    </div>
    
  );

  function handleOpen() {
    setMoreLess(!moreLess);
  }
};
