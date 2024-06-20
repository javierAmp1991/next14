//@ts-ignore
import style from "./scroll-mutation-container.module.css";
import {ReactNode, useLayoutEffect, useRef} from "react";
import {useScrollHook} from "./scroll-hook";
import {APPLY, RETURN} from "../const";
import {EnumColorMainButton, IMainButton, MainButton} from "../main-button/main-button";

export interface IScrollMutationContainerMobile {
  OnApplyText?: string;
  OnReturnText?: string;
  OnReturn?: Function;
  OnApply?: Function;
  OnPlus?: Function;
  Dependency: number;
  OnAlternative?: Function;
  OnAlternativeText?: string;
  Style?: string;
  UseDefaultGrid?: boolean
  Buttons?: ButtonScrollMutation[]
}

export interface ButtonScrollMutation{
    OnClick: ()=>void
    Name: string
    Position: number
}

const limitScroll: number = 85;

export const ScrollMutationContainerMobile = ({props, children}: { props: IScrollMutationContainerMobile, children: ReactNode }) => {
    const buttonApply: IMainButton = {
        Text: props.OnApplyText ? props.OnApplyText : APPLY,
        OnClick: handleApply,
    };
    const returnButton: IMainButton = {
        Text: props.OnReturnText ? props.OnReturnText : RETURN,
        OnClick: handleReturn,
        ColorButton: EnumColorMainButton.UseBorder
    };
    const alternativeButton: IMainButton = {
        Text: props.OnAlternativeText ? props.OnAlternativeText : RETURN,
        OnClick: handleAlternative,
    };
    const refContainer = useRef<HTMLDivElement>(null);
    const {handleScroll, config} = useScrollHook({ref: refContainer});
    const mainStyle = `${style.main} ${props.UseDefaultGrid && style.defaultGRid} ${props.Style}`;
    const buttonSelected: ButtonScrollMutation | undefined = props.Buttons?.find(b=>b.Position === props.Dependency);
    const defaultButtonProps: IMainButton = {
        OnClick: handleClick,
        Text: buttonSelected? buttonSelected.Name : ""
    };
    useLayoutEffect(() => {
        if (refContainer.current) {
            if (refContainer.current.scrollTop > limitScroll) refContainer.current.scrollTop = limitScroll;
        }
    }, [props.Dependency])

    return (
        <div id={"idContainerMobile"} ref={refContainer} onScroll={handleScroll} className={mainStyle}>
            {children}
            { buttonSelected !== undefined &&
                <div style={{transform: `translateY(${config.Translate}px)`}} className={style.gridButton}>
                    <MainButton props={defaultButtonProps}/>
                </div>
            }    
            {/*
                (props.OnReturn !== undefined || props.OnApply !== undefined) &&
                <>
                    <div style={{transform: `translateY(${config.Translate}px)`}} className={style.gridButton}>
                        {props.OnAlternative !== undefined && <MainButton props={alternativeButton}/>}
                        {props.OnReturn !== undefined && <MainButton props={returnButton}/>}
                        {props.OnApply !== undefined && <MainButton props={buttonApply}/>}
                    </div>
                </>
            */}
        </div>
    )

    function handleReturn() {
        if (props.OnReturn !== undefined) props.OnReturn()
    }

    function handlePlus() {
        if (props.OnPlus !== undefined) props.OnPlus()
    }

    function handleApply() {
        if (props.OnApply !== undefined) props.OnApply()
    }

    function handleAlternative(){
        props.OnAlternative && props.OnAlternative()
    }

    function handleClick(){
        if(buttonSelected) buttonSelected.OnClick()
    }
}