//@ts-ignore
import style from "./style.module.css";
import Image from "next/image";
import {RATING_STAR, RATING_STAR_EMPTY} from "../../icons";

export interface IRatingStars {
    Style?: string
    Rating: number,
    RatingCount?: number
    Number?: string
    UseTiny?: boolean
}

export const RatingStars = ({prop, useFirst}: { prop: IRatingStars, useFirst?: boolean }) =>{
    const listRating: number[] = [1, 2, 3, 4, 5];
    return (
        <div className={style.main}>
            <div className={style.gridStars}>
                {
                    listRating.map(item =>
                        <div key={item} className={`${style.star} ${prop.UseTiny && style.starTiny} ${prop.Style}`}>
                            <Image alt="" layout={"fill"} priority={true} src={item <= prop.Rating ? RATING_STAR : RATING_STAR_EMPTY}/>
                        </div>
                    )
                }
            </div>
            {
                (prop.RatingCount && !useFirst) &&
                <div className={`${style.ratingText} ${prop.UseTiny && style.ratingTextTiny} ${style.yellow} ${prop.Style}`}>
                    <span className={`${style.parent} ${prop.UseTiny && style.parentTiny}`}>(</span>
                    <span className={`${style.number} ${prop.Number}`}>{prop.RatingCount}</span>
                    <span className={`${style.parent} ${prop.UseTiny && style.parentTiny}`}>)</span>
                </div>
            }
        </div>

    )
}