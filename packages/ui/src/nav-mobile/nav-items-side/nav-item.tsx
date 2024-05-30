//@ts-ignore
import style from "./nav-item.module.css";
import Image from "next/image";
import Link from "next/link";
import {NavOptionsProps} from "../nav-desktop-props";

export default function NavItem({item, isIpad, link}: { item: NavOptionsProps, isIpad?: boolean, link: string }) {
    const stateItem = item.UrlKey === link;
    const nStyle = stateItem ? style.selected : style.noSelected;
    return (
        <Link scroll={true} href={item.Id}>
            <span id={item.Id} className={`${style.main} ${isIpad && style.mainIpad} ${nStyle}`}>
                <div className={`${style.icon} ${isIpad && style.iconIpad}`}>
                    <Image alt="" priority={true} layout={"fill"} src={item.Icon!}/>
                </div>
                <div className={`${style.name} ${isIpad && style.opacity}`}>
                    {item.Name}
                </div>
            </span>
        </Link>
    )
}