import style from "./info.module.css";

export default function UpOrDownTickets() {
    const NumberSearch = 3;
    return (
        <div className={style.gridNumbers}>
            <button onClick={handleRemove} className={style.number}>
                -
            </button>
            <div className={style.amount}>
                {NumberSearch}
            </div>
            <button onClick={handleAdd} className={style.number}>
                +
            </button>
        </div>
    )

    function handleAdd() {
    }

    function handleRemove() {
    }
}