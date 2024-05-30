import css from "./table.module.css";

export default function ReturnButton({isVisible, onReturn}: { isVisible: boolean, onReturn: () => void }) {
    return (
        <button onClick={() => onReturn()} className={`${css.returnCont} ${isVisible && css.enter}`}>
            <div className={css.return}/>
        </button>
    )
}