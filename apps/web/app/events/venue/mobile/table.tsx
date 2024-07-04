import { CSSProperties } from "react";
import { Row, EmtyRow, Table, TableProps, EnumTypeHeaderColum } from "@repo/ui/tableMobile";
import css from "./administration.module.css";
import EnclosureColumns from "./enclosure-columns";
import ServiceExpand from "./service-expand";
import { useVenueProvider } from "../provider";

export default function ServiceTable() {
  const { Venues, HandleMutation } = useVenueProvider();
  const total = Venues.length;
  const RowRender = (
    index: number,
    key: string,
    style: CSSProperties,
    isOpen: boolean
  ) => {
    const item = Venues[index];
    if (item === undefined)
      return <EmtyRow style={style} index={index} key={key} />;
    else
      return (
        <Row
          Expandable={<ServiceExpand item={item} />}
          Columns={<EnclosureColumns item={item} />}
          Style={style}
          key={key}
          Index={index}
          Grid={css.grid!}
          IsOpen={isOpen}
          OnMutation={() => HandleMutation(item.Id)}
        />
      );
  };
  const props: TableProps = {
    ListHeader: [
      { Name: "Recinto", Type: EnumTypeHeaderColum.AscDesc, HandleFilter: ()=>{} },
      { Name: "Direccion", Type: EnumTypeHeaderColum.NumRange, HandleFilter: ()=>{} },
      { Name: "Eventos" },
      { Name: "Planos" }
    ],
    TotalRows: total,
    FilterSelected: undefined,
    GridHeader: css.grid!,
    Width: 730,
    OnRowEnd: () => {},
    RowRender: RowRender,
  };

  return <Table props={props} />;
}
