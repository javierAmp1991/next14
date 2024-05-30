//@ts-ignore
import css from "./table.module.css";
import ColumnHeader from "../column-header/column-header";
import {EComponent} from "../expandable-button/e-component";
import {Filters} from "../filters/filters";
import {ReturnButton} from "./return-button";
import {createContext, CSSProperties, useContext, useMemo, useRef, useState, UIEvent, useEffect} from "react";
import {TableProps, IVariableRow, IColumProps, IIndexes, IExpandableProps, TableContextProps} from "../props";

// @ts-ignore
export const TableContext = createContext<TableContextProps>(null);

export function useTableContext() {
    const provider = useContext(TableContext)
    if (!provider) throw new Error("error")
    else return provider
}

const ROW_HEIGHT = 80;
const HEADER_HEIGHT = 40;
const WIDTH_EXPAND = 50;
const DEFAULT_OVERSCAN = 12;
const INITIAL_TABLE_DIMENSION = {
    width: 0,
    height: 0
};
const LINE = `.1rem solid #f1f1f1`;
const NO_LINE = `none`;

export const Table = ({props}: { props: TableProps }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const contRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);

    const [tableDimension, setTableDimension] = useState(INITIAL_TABLE_DIMENSION);
    const [isActiveScroll, setIsActiveScroll] = useState(true);

    const initialTotalRowVisible = useMemo(() => {
        return getTotalRowVisible()
    }, []);
    const [totalRowsVisible, setTotalRowsVisible] = useState(initialTotalRowVisible);

    const [variableRows, setVariableRows] = useState<IVariableRow[]>([]);
    const [controlScroll, setControlScroll] = useState(0);

    const initialIndexes = useMemo(() => {
        return getIndexes(0)
    }, []);
    const initialProps = useMemo(() => {
        return getComponentsProps(initialIndexes.Start, initialIndexes.Finish, variableRows)
    }, []);
    const initialVirtualHeight = useMemo(() => {
        return getVirtualHeight(variableRows)
    }, []);
    const initialMainProps = useMemo(() => {
        return getMainProps()
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [rowProps, setRowProps] = useState<IColumProps[]>(initialProps.rowList);
    const [expProps, setExpProps] = useState<IExpandableProps[]>(initialProps.expandList);
    const [virtualHeight, setVirtualHeight] = useState(initialVirtualHeight);
    const [mainProps, setMainProps] = useState<CSSProperties>(initialMainProps);
    const [isReturnVisible, setIsReturnVisible] = useState(false);

    const provider: TableContextProps = {
        AddRow: addRow,
        RemoveRow: removeRow,
    };

    useEffect(() => {
        setVirtualHeight(getVirtualHeight(variableRows))
        setMainProps(getMainProps())
        setTotalRowsVisible(getTotalRowVisible())
        requestAnimationFrame(() => activateVirtualization(controlScroll));
    }, [props.TotalRows, tableDimension])

    useEffect(() => {
        const getDimensions = () => {
            if (mainRef.current) {
                const {width, height} = mainRef.current.getBoundingClientRect();
                setTableDimension({width, height});
            }
        };

        getDimensions();

        window.addEventListener('resize', getDimensions);

        return () => {
            window.removeEventListener('resize', getDimensions);
        };
    }, []);

    return (
    // @ts-ignore
        <TableContext.Provider value={provider}>
            <div ref={mainRef} className={css.main}>
                <div ref={contRef} style={mainProps} className={css.mainGrid} onScroll={handleScroll}>
                    <div ref={rowRef} style={{height: virtualHeight}} className={css.contChildren}>
                        <div style={{width: props.Width}} className={`${props.GridHeader} ${css.gridHeader}`}>
                            {props.ListHeader.map(f => <ColumnHeader name={f.Name} key={f.Name}/>)}
                        </div>

                        {rowProps.map(e => props.RowRender(e.Index, e.Key, e.Style, e.IsOpen))}
                    </div>

                    <div style={{height: virtualHeight}} className={`${css.contChildren} ${css.sticky}`}>
                        <div className={css.contFilter} onClick={handleFilter}>
                            <div className={css.first}/>
                            <div className={css.second}/>
                            <div className={css.third}/>
                        </div>

                        {expProps.map(e => <EComponent key={e.Key} style={e.Style} index={e.Index}
                                                       isOpen={e.IsOpen}/>)}
                    </div>
                </div>

                <Filters selected={props.FilterSelected} isOpen={isOpen} handleClose={handleFilter} filters={props.ListHeader}/>

                <ReturnButton isVisible={isReturnVisible} onReturn={handleReturn}/>
            </div>
        </TableContext.Provider>
    )

    function getComponentsProps(start: number, finish: number, list: IVariableRow[]) {
        const rowList: IColumProps[] = [];
        const expandList: IExpandableProps[] = [];
        for (let i = start; i < finish; i++) {
            const plus = getNewTop(i, list);
            const getHeight = list.find(e => i === e.Index);
            const isVisible = i >= start && i <= finish;
            const isAbove = i >= props.TotalRows;
            const rowStyle: CSSProperties = {
                top: (i * ROW_HEIGHT) + plus + HEADER_HEIGHT,
                //transform: `translateY(${(i * ROW_HEIGHT) + plus + HEADER_HEIGHT}px)`,
                height: getHeight ? getHeight.Height : ROW_HEIGHT,
                width: props.Width,
                borderBottom: isVisible || !isAbove ? LINE : NO_LINE
            };
            const expandStyle: CSSProperties = {
                top: (i * ROW_HEIGHT) + plus + HEADER_HEIGHT,
                //transform: `translateY(${(i * ROW_HEIGHT) + plus + HEADER_HEIGHT}px)`,
                height: getHeight ? getHeight.Height : ROW_HEIGHT,
                width: WIDTH_EXPAND,
                borderBottom: isVisible || !isAbove ? LINE : NO_LINE
            };
            rowList.push({
                Style: rowStyle,
                Index: i,
                Key: `row_key_${i - start}`,
                IsOpen: getHeight !== undefined
            })
            expandList.push({
                Style: expandStyle,
                Index: i,
                Key: `expand_key_${i - start}`,
                IsOpen: getHeight !== undefined
            })
        }
        return {rowList, expandList}
    }

    function getIndexes(displacement: number): IIndexes {
        const initialStart = Math.floor(displacement / ROW_HEIGHT);
        const initialEnd = Math.ceil((displacement + tableDimension.height) / ROW_HEIGHT - 1);
        let startIndex = initialStart;
        let endIndex = initialEnd;
        const totalVisible = initialEnd - initialStart;
        if (totalVisible >= props.TotalRows) {
            setIsActiveScroll(false)
            return {Start: startIndex, Finish: endIndex, TargetStart: initialStart, TargetEnd: initialEnd}
        } else if (totalRowsVisible >= props.TotalRows) {
            const extra = totalRowsVisible - props.TotalRows;
            endIndex += extra;
            setIsActiveScroll(false)
            return {Start: startIndex, Finish: endIndex, TargetStart: initialStart, TargetEnd: initialEnd}
        } else {
            const overScan = props.Overscan || DEFAULT_OVERSCAN
            startIndex = Math.max(initialStart - overScan, 0);
            endIndex = Math.min(initialEnd + overScan, props.TotalRows);
            setIsActiveScroll(true)
            return {Start: startIndex, Finish: endIndex, TargetStart: initialStart, TargetEnd: initialEnd}
        }
    }

    function getVirtualHeight(list: IVariableRow[]) {
        let varHeight = ROW_HEIGHT * props.TotalRows;
        if (list.length > 0) list.forEach(e => varHeight += e.Height - ROW_HEIGHT)
        return varHeight;
    }

    function getNewTop(index: number, list: IVariableRow[]) {
        let plus = 0;
        const newList = list.filter(e => e.Index < index);
        if (newList.length > 0) {
            newList.forEach(i => {
                plus += i.Height - ROW_HEIGHT;
            })
        }
        return plus
    }

    function handleScroll(e: UIEvent) {
        const scroll = e.currentTarget.scrollTop;
        if (isActiveScroll) {
            if (rowRef.current && contRef.current) {
                const scrollDown = scroll > controlScroll;
                const parent = contRef.current.getBoundingClientRect();
                if (scrollDown) {
                    const lastChild = rowRef.current.children[rowRef.current.children.length - 1];
                    if (lastChild) {
                        const bottom = lastChild.getBoundingClientRect().bottom;
                        if (bottom < parent.bottom) requestAnimationFrame(() => activateVirtualization(scroll))
                        if (scroll >= virtualHeight - tableDimension.height) props.OnRowEnd()
                    }
                    setIsReturnVisible(true)
                } else {
                    const firstChild = rowRef.current.children[1];
                    if (firstChild) {
                        const top = firstChild.getBoundingClientRect().top;
                        if (top > parent.top) requestAnimationFrame(() => activateVirtualization(scroll))

                    }
                    setIsReturnVisible(false)
                }
            }
        }
        setControlScroll(scroll)
    }

    function activateVirtualization(displacement?: number) {
        const total = displacement || contRef.current!.scrollTop;
        const newIndexes = getIndexes(total);
        const newStyles = getComponentsProps(newIndexes.Start, newIndexes.Finish, variableRows);
        setRowProps(newStyles.rowList)
        setExpProps(newStyles.expandList)
    }

    function handleFilter() {
        setIsOpen(!isOpen)
    }

    function getTotalRowVisible() {
        const overScan = props.Overscan || DEFAULT_OVERSCAN;
        return Math.ceil(tableDimension.height / ROW_HEIGHT) + (overScan * 2);
    }

    function getMainProps() {
        return {
            width: tableDimension.width,
            height: tableDimension.height,
            gridTemplateColumns: `${props.Width}px ${WIDTH_EXPAND}px`
        }
    }

    function addRow(index: number, height?: number) {
        const controlHeight = height ? height : 0;
        let newList: IVariableRow[] = []
        const find = variableRows.find(e => e.Index === index);

        if (find === undefined) newList = [...variableRows, {Height: controlHeight + ROW_HEIGHT, Index: index}]
        else newList = variableRows.map(e => {
            if (e.Index === index) return {...e, Height: height ? controlHeight + ROW_HEIGHT : ROW_HEIGHT}
            else return {...e}
        })

        const newIndexes = getIndexes(contRef.current!.scrollTop);
        const newProps = getComponentsProps(newIndexes.Start, newIndexes.Finish, newList);

        setRowProps(newProps.rowList)
        setExpProps(newProps.expandList)
        setVariableRows(newList)
        setVirtualHeight(getVirtualHeight(newList))
    }

    function removeRow(index: number) {
        const newList = variableRows.filter(e => e.Index !== index);
        const newIndexes = getIndexes(contRef.current!.scrollTop);
        const newProps = getComponentsProps(newIndexes.Start, newIndexes.Finish, newList);
        setVariableRows(newList)
        setVirtualHeight(getVirtualHeight(newList))
        setRowProps(newProps.rowList)
        setExpProps(newProps.expandList)
    }

    function handleReturn() {
        if (contRef.current) {
            const scrollTop = contRef.current.scrollTop;
            if (scrollTop >= tableDimension.height * 2) {
                contRef.current.scrollTop -= tableDimension.height * 2;
                setTimeout(() => {
                    contRef.current!.style.scrollBehavior = "auto"
                    contRef.current!.scrollTop = 0;
                    contRef.current!.style.scrollBehavior = "smooth";
                }, 500)

            } else contRef.current!.scrollTop = 0;

        }
    }
}