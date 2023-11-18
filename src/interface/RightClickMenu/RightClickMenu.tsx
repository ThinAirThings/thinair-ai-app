import { createRootDivPortal } from "@thinairthings/react-utils"
import { Point } from "@thinairthings/zoom-utils"
import { FC, PointerEvent, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { stackStyle } from "../../styles/stackStyle"
import { fromEvent } from "rxjs"


export type RightClickMenuComponent = FC<{setInactive: ()=>void}>

const RightClickMenuContext = createContext<
    (position: Point, Component: RightClickMenuComponent) => void
>(null as any)

export const useCreateRightClickMenu = () => {
    const createRightClickMenu = useContext(RightClickMenuContext)
    return (event: MouseEvent | PointerEvent, Component: RightClickMenuComponent) => {
        event.preventDefault()
        createRightClickMenu({x: event.clientX, y: event.clientY}, Component)
    }
}

export const RightClickMenuProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    // State
    const [position, setPosition] = useState<Point|null>(null)
    const [Component, setComponent] = useState<{
        FC: RightClickMenuComponent
    } | null>(null)
    // Callback
    const createRightClickMenu = useCallback((
        position: Point,
        Component: RightClickMenuComponent
    ) => {
        setPosition(position)
        setComponent({FC: Component})
    }, [])
    // Effects
    useEffect(() => {
        const clickSubscription = fromEvent<PointerEvent>(window, 'click')
        .subscribe(() => {
            setPosition(null)
            setComponent(null)
        })
        return () => clickSubscription.unsubscribe()
    }, [])
    // Tree
    return (
        <>
            <RightClickMenuContext.Provider value={createRightClickMenu}>
                {children}
            </RightClickMenuContext.Provider>
            {position && createRootDivPortal(<StyledRightClickMenu
                style={{
                    left: position.x,
                    top: position.y
                }}
            >
                {Component && <Component.FC setInactive={() => setPosition(null)}/>}
            </StyledRightClickMenu>)}
        </>
    )
}

const StyledRightClickMenu = styled.div`
    position: absolute;
    padding: 7px;
    ${stackStyle('v', 'left', 'top')}
    ${({theme})=>theme.boxStyles(theme.zIndex.interface)}
    background-color: ${({theme}) => theme.dark.white};
    border: 1px solid ${({theme}) => theme.dark.grayBorder};
`