//@ts-ignore
import style from "./filters.module.css";
import { EnumStateAscDes, HeaderColumAscDes } from "../props";
import { FilterContainer } from "./filter-container";
import { ASCENDING, DESCENDING } from "../const";

export const AscDes = ({
  props,
  isSelected,
}: {
  props: any;
  isSelected: boolean;
}) => {
  const item = props as HeaderColumAscDes;
  return (
    <FilterContainer name={item.Name} type={item.Type!}>
        <div className={style.gridOptions}>
          <span>{item.From || ASCENDING}</span>
          <input
            type="radio"
            checked={isSelected ? item.IsAscending : false}
            onChange={() => item.HandleFilter(EnumStateAscDes.Ascending)}
          />
        </div>
        <div className={style.gridOptions}>
          <span>{item.To || DESCENDING}</span>
          <input
            type="radio"
            checked={isSelected ? !item.IsAscending : false}
            onChange={() => item.HandleFilter(EnumStateAscDes.Descending)}
          />
        </div>
    </FilterContainer>
  );
};
