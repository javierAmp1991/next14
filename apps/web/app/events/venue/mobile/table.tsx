import { CSSProperties } from "react";
import { Row, EmtyRow, Table, TableProps } from "@repo/ui/tableMobile";
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
          style={style}
          key={key}
          index={index}
          grid={css.grid!}
          isOpen={isOpen}
          onMutation={() => HandleMutation(item.Id)}
        />
      );
  };
  const props: TableProps = {
    ListHeader: [
      { Name: "Recinto" },
      { Name: "Direccion" },
      { Name: "Eventos" },
      { Name: "Planos" },
      { Name: "Editar" },
    ],
    TotalRows: total,
    FilterSelected: undefined,
    GridHeader: css.grid!,
    Width: 930,
    OnRowEnd: () => {},
    RowRender: RowRender,
  };

  return <Table props={props} />;
}
