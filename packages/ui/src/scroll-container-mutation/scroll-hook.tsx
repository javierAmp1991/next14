import React, {useState} from "react";

const limitUp: number = 58;
const limitDown: number = 0;
const slowScroll: number = 3;
const defaultConfig = {
    Translate: limitDown,
    PrevScrollPos: limitDown,
    Padding: limitUp
};

export function useScrollHook({ref}: { ref: React.RefObject<HTMLDivElement> }) {
    const [config, setConfig] = useState(defaultConfig);

    function handleScroll(e: React.UIEvent<HTMLElement>) {
        if (ref.current) {
            const sizeScroll = ref.current.scrollHeight - ref.current.clientHeight;
            if (sizeScroll > limitUp * slowScroll) {
                const currentScrollPos = e.currentTarget.scrollTop;
                let translate = config.Translate;
                let padding = config.Padding;

                if (currentScrollPos > config.PrevScrollPos) {
                    const scrollDelta = (currentScrollPos - config.PrevScrollPos) / slowScroll;
                    const newTranslate = translate + scrollDelta;
                    translate = newTranslate > limitUp ? limitUp : newTranslate;
                } else {
                    const scrollDelta = (config.PrevScrollPos - currentScrollPos) / slowScroll;
                    const newTranslate = translate - scrollDelta;
                    translate = newTranslate < limitDown ? limitDown : newTranslate;
                }

                if (currentScrollPos < config.PrevScrollPos) {
                    const scrollDelta = (currentScrollPos - config.PrevScrollPos) / slowScroll;
                    const newTranslate = padding - scrollDelta;
                    padding = newTranslate > limitUp ? limitUp : newTranslate;
                } else {
                    const scrollDelta = (config.PrevScrollPos - currentScrollPos) / slowScroll;
                    const newTranslate = padding + scrollDelta;
                    padding = newTranslate < limitDown ? limitDown : newTranslate;
                }
                setConfig({
                    Translate: translate,
                    PrevScrollPos: currentScrollPos,
                    Padding: 58
                })
            }
            else setConfig(defaultConfig)
        }
    }

    function handleReset() {
        setConfig(defaultConfig)
    }

    return {handleScroll, handleReset, config}
}