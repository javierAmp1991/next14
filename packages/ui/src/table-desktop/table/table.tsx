//@ts-ignore
import css from "./table.module.css";
import {Filters} from "../filters/filters";
import {CSSProperties, UIEvent, useEffect, useMemo, useRef, useState} from "react";
import {IColumProps, IIndexes, TableProps} from "../props";
import ReturnButton from "./return-button";

const ROW_HEIGHT = 80;
const NO_HEIGHT = 0;
const DEFAULT_OVERSCAN = 10;
const HEADER_HEIGHT = 40;
const LINE = `.1rem solid #f1f1f1`;
const NO_LINE = `none`;
const INITIAL_TABLE_DIMENSION = {
    width: 0,
    height: 0
};

export const TableDesktop = ({props}: { props: TableProps }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const contRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);

    const [tableDimension, setTableDimension] = useState(INITIAL_TABLE_DIMENSION);
    const [isActiveScroll, setIsActiveScroll] = useState(true);

    const initialTotalRowVisible = useMemo(() => {return getTotalRowVisible()}, []);
    const [totalRowsVisible, setTotalRowsVisible] = useState(initialTotalRowVisible);

    const initialIndexes = useMemo(() => {return getIndexes(0)}, []);
    const initialProps = useMemo(() => {return getComponentsProps(initialIndexes)}, []);
    const initialVirtualHeight = useMemo(() => {return getVirtualHeight()}, []);
    const initialMainProps = useMemo(() => {return getMainProps()}, []);

    const [cScroll, setCScroll] = useState<number>(0);
    const [rowProps, setRowProps] = useState<IColumProps[]>(initialProps.rowList);
    const [virtualHeight, setVirtualHeight] = useState<number>(initialVirtualHeight);
    const [mainProps, setMainProps] = useState<CSSProperties>(initialMainProps);
    const [isReturnVisible, setIsReturnVisible] = useState(false);

    useEffect(() => {
        setVirtualHeight(getVirtualHeight())
        setMainProps(getMainProps())
        setTotalRowsVisible(getTotalRowVisible())
        requestAnimationFrame(() => activateVirtualization(cScroll));
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
        <div className={`${css.main} ${props.DontUseHorizontalPadding && css.noPadding}`}>
            <div ref={mainRef} className={`${css.mainCont} ${props.DontUseExternalBorder && css.noBorder}`}>
                <div ref={contRef} style={mainProps} className={css.mainGrid} onScroll={handleScroll}>
                    <div ref={rowRef} style={{height: virtualHeight}} className={css.contChildren}>
                        <Filters filters={props.ListHeader} grid={props.GridHeader} selected={props.FilterSelected}/>
                        {rowProps.map(e => props.RowRender(e.Index, e.Key, e.Style))}
                    </div>
                </div>
                <ReturnButton isVisible={isReturnVisible} onReturn={handleReturn}/>
            </div>
        </div>
    )

    function getComponentsProps(values: IIndexes) {
        const rowList: IColumProps[] = [];
        for (let i = values.Start; i < values.Finish; i++) {
            const isAbove = i >= props.TotalRows;
            const isVisible = i >= values.TargetStart && i <= values.TargetEnd;
            const rowStyle: CSSProperties = {
                //transform: isVisible ? `translateY(${(i * ROW_HEIGHT) + HEADER_HEIGHT}px)` : isAbove ? `translateY(${((props.TotalRows - 1) * ROW_HEIGHT)}px)` : `translateY(${(i * ROW_HEIGHT) + HEADER_HEIGHT}px)`,
                top: isVisible || !isAbove ? (i * ROW_HEIGHT) + HEADER_HEIGHT : (props.TotalRows - 1) * ROW_HEIGHT,
                height: isVisible ? ROW_HEIGHT : isAbove ? NO_HEIGHT : ROW_HEIGHT,
                borderBottom: isVisible ? LINE : isAbove ? NO_LINE : LINE
            };
            rowList.push({
                Style: rowStyle,
                Index: i,
                Key: `row_key_${i - values.Start}`
            })
        }
        return {rowList}
    }

    function getIndexes(displacement: number): IIndexes {
        const initialStart = Math.floor(displacement / ROW_HEIGHT);
        const initialEnd = Math.ceil((displacement + tableDimension.height) / ROW_HEIGHT);
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
            const overScan = props.Overscan || DEFAULT_OVERSCAN;
            startIndex = Math.max(initialStart - overScan, 0);
            endIndex = Math.min(initialEnd + overScan, props.TotalRows);
            setIsActiveScroll(true)
            return {Start: startIndex, Finish: endIndex, TargetStart: initialStart, TargetEnd: initialEnd}
        }
    }

    function handleScroll(e: UIEvent) {
        const scroll = e.currentTarget.scrollTop;
        if (isActiveScroll) {
            if (rowRef.current && contRef.current) {
                const scrollDown = scroll > cScroll;
                const parent = contRef.current.getBoundingClientRect();
                if (scrollDown) {
                    setIsReturnVisible(true)
                    const lastChild = rowRef.current.children[rowRef.current.children.length - 1];
                    if (lastChild) {
                        const bottom = lastChild.getBoundingClientRect().bottom;
                        if (bottom < parent.bottom) {
                            requestAnimationFrame(() => activateVirtualization(scroll))
                        }
                        if (scroll >= virtualHeight - tableDimension.height) props.OnRowEnd()
                    }
                } else {
                    setIsReturnVisible(false)
                    const firstChild = rowRef.current.children[1];
                    if (firstChild) {
                        const top = firstChild.getBoundingClientRect().top;
                        if (top > parent.top) {
                            requestAnimationFrame(() => activateVirtualization(scroll))
                        }
                    }
                }
            }
        }
        setCScroll(scroll)
    }

    function activateVirtualization(displacement?: number) {
        const total = displacement || contRef.current!.scrollTop;
        const newIndexes = getIndexes(total);
        const newStyles = getComponentsProps(newIndexes);
        setRowProps(newStyles.rowList)
    }

    function getTotalRowVisible() {
        const overScan = props.Overscan || DEFAULT_OVERSCAN;
        return Math.ceil(tableDimension.height / ROW_HEIGHT) + (overScan * 2);
    }

    function getVirtualHeight() {
        return ROW_HEIGHT * props.TotalRows
    }

    function getMainProps() {
        return {height: tableDimension.height, width: tableDimension.width}
    }

    function handleReturn() {
        if (contRef.current) {
            const scrollTop = contRef.current.scrollTop;
            if (scrollTop >= tableDimension.height * 2) {
                contRef.current.scrollTop -= tableDimension.height;
                setTimeout(() => {
                    contRef.current!.style.scrollBehavior = "auto"
                    contRef.current!.scrollTop = 0;
                    contRef.current!.style.scrollBehavior = "smooth";
                }, 300)

            } else contRef.current!.scrollTop = 0;

        }
    }
}