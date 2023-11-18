import { ScreenState } from "@thinairthings/zoom-utils";
import classNames from "classnames";
import styled from "styled-components";
import { usePointerTransform } from "./hooks/usePointerTransform";
import { useRenderedRef } from "@thinairthings/react-utils";


export const transformTargetTypes = ["topLeft", "topMiddle" , "topRight" , "middleLeft" , "middleRight" , "bottomLeft" ,"bottomMiddle" , "bottomRight" ] as const;
export type TransformTargetType = typeof transformTargetTypes[number];


const transformZoneSize = 10
export const TransformZone = ({
    transformTargetType,
    boxBounds
}: {
    transformTargetType: TransformTargetType
    boxBounds: ScreenState
}) => {
    // Refs
    const transformZoneRef = useRenderedRef<HTMLDivElement>()
    // Effects
    usePointerTransform(transformZoneRef.current, transformTargetType)
    return (
        <StyledTransformZone
            ref={transformZoneRef}
            className={classNames({
                topLeft: transformTargetType === "topLeft",
                topRight: transformTargetType === "topRight",
                bottomLeft: transformTargetType === "bottomLeft",
                bottomRight: transformTargetType === "bottomRight",
                topMiddle: transformTargetType === "topMiddle",
                bottomMiddle: transformTargetType === "bottomMiddle",
                middleLeft: transformTargetType === "middleLeft",
                middleRight: transformTargetType === "middleRight"
            })}
            style={{
                top: `-${transformZoneSize/2}px`,
                left: `-${transformZoneSize/2}px`,
                width: `${(() => {
                    switch(true) {
                        case transformTargetType === "topMiddle"  
                        || transformTargetType === "bottomMiddle":  return `${boxBounds.width - transformZoneSize}px`
                        default: return `${transformZoneSize}px`
                    }
                })()}`,
                height: `${(() => {
                    switch(true) {
                        case transformTargetType === "middleLeft"
                        || transformTargetType === "middleRight": return `${boxBounds.height - transformZoneSize}px`
                        default: return `${transformZoneSize}px`
                    }
                })()}`,
                transform: `translate(
                    ${(() => {
                        switch(transformTargetType) {
                            case "topLeft": return `${boxBounds.x}px, ${boxBounds.y}px`
                            case "topMiddle": return `${boxBounds.x + transformZoneSize}px, ${boxBounds.y}px`
                            case "topRight": return `${boxBounds.x + boxBounds.width}px, ${boxBounds.y}px`
                            case "middleRight": return `${boxBounds.x + boxBounds.width}px, ${boxBounds.y+transformZoneSize}px`
                            case "bottomRight": return `${boxBounds.x + boxBounds.width}px, ${boxBounds.y + boxBounds.height}px`
                            case "bottomMiddle": return `${boxBounds.x + transformZoneSize}px, ${boxBounds.y + boxBounds.height}px`
                            case "bottomLeft": return `${boxBounds.x}px, ${boxBounds.y + boxBounds.height}px`
                            case "middleLeft": return `${boxBounds.x}px, ${boxBounds.y + transformZoneSize}px`
                        }
                    })()}
                )`
            }}
        />
    )
}

const StyledTransformZone = styled.div`
    background-color: transparent;
    position: absolute;
    &.topLeft {cursor: nwse-resize;}
    &.topRight {cursor: nesw-resize;}
    &.bottomLeft {cursor: nesw-resize;}
    &.bottomRight {cursor: nwse-resize;}
    &.topMiddle {cursor: ns-resize;}
    &.bottomMiddle {cursor: ns-resize;}
    &.middleLeft {cursor: ew-resize;}
    &.middleRight {cursor: ew-resize;}
`