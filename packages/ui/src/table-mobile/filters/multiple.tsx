//@ts-ignore
import style from "./filters.module.css";
import {HeaderColumMultiple} from "../props";
import {FilterContainer} from "./filter-container";

export const  Multiple = ({props, isSelected}: { props: any, isSelected: boolean }) => {
    const item = props as HeaderColumMultiple;
    return (
        <FilterContainer name={item.Name} type={item.Type!}>
            <>
                {item.Options.map(e =>
                    <div className={style.gridOptions} key={e.Name}>
                        <span>{e.Name}</span>
                        <input type="radio" checked={isSelected ? e.State : false}
                               onChange={() => handleOption(e.Name)}/>
                    </div>
                )}
            </>
        </FilterContainer>
    )

    function handleOption(option: string) {
        item.HandleFilter(option)
    }
}