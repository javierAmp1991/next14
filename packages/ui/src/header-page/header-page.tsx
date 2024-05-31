//@ts-ignore
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

const ICON_HEADER = "/icons/logoSpixHeader.png";
const LOCATION_ICON_HEADER = "/icons/locationIconHeader.png";
const PROFILE_ICON = "/icons/profileConfigIcon.png";
const GLASS_ICON = "/icons/glassWhite.png";

const CONST = {
  Loc: {
    Link: "/",
    Image: LOCATION_ICON_HEADER,
    FirstText: "Ingresa tu",
    SecondText: "Ubicacion",
  },
  User: {
    Link: "/",
    Image: PROFILE_ICON,
    FirstText: "Iniciar",
    SecondText: "Sesion",
  },
};

export const HeaderPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.main}>
      <div className={style.grid}>
        <Link href={"/"} as={"/"}>
          <div className={style.sizeLogo}>
            <Image alt="" priority={true} layout={"fill"} src={ICON_HEADER} />
          </div>
        </Link>
        <Section
          link={CONST.Loc.Link}
          image={CONST.Loc.Image}
          fText={CONST.Loc.FirstText}
          sText={CONST.Loc.SecondText}
        />
        <div className={style.gridSearchBar}>
          <input
            placeholder={"Buscar servicio, producto o evento"}
            type="text"
          />
          <button className={style.contGlassIcon}>
            <div className={style.glassIcon}>
              <Image alt="" layout={"fill"} src={GLASS_ICON} />
            </div>
          </button>
        </div>
        <Section
          link={CONST.User.Link}
          image={CONST.User.Image}
          fText={CONST.User.FirstText}
          sText={CONST.User.SecondText}
        />
      </div>
      {children}
    </div>
  );
};

const Section = ({
  link,
  image,
  fText,
  sText,
}: {
  link: string;
  image: string;
  fText: string;
  sText: string;
}) => (
  <Link href={link}>
    <div className={style.gridImageText}>
      <div className={style.sizeIcons}>
        <Image alt="" priority={true} layout={"fill"} src={image} />
      </div>
      <div className={style.contText}>
        <div className={style.firstText}>{fText}</div>
        <div className={style.secondText}>{sText}</div>
      </div>
    </div>
  </Link>
);
