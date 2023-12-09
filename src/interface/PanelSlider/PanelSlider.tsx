import { useState } from "react"
import { usePanelSliderPointerActions } from "./hooks/usePanelSliderPointerActions";
import styled from "@emotion/styled";
import classNames from "classnames";

export const PanelSlider = <J extends boolean>({
    orientation,
    location,
    joint,
    sliderGroup,
    sliderControlledDimension,
    setSliderControlledDimension
}: {
    orientation: 'horizontal' | 'vertical'
    location: 'start' | 'end'
    joint?: J
    sliderGroup: number
    sliderControlledDimension: J extends true ? [number, number] : number
    setSliderControlledDimension: (
        value: J extends true ? [number, number] : number
    ) => void;
}) => {
    // State
    const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null)
    usePanelSliderPointerActions(
        orientation,
        location,
        joint??false,
        sliderRef, 
        sliderControlledDimension,
        setSliderControlledDimension
    )
    return (
        <PanelSliderRoot 
            ref={setSliderRef}
            className={classNames(
                orientation, 
                location, 
                joint ? 'joint' : '', 
                `sliderGroup-${sliderGroup}`
            )}
            {...joint ? {
                onMouseEnter: () => {
                    document.querySelectorAll(`.sliderGroup-${sliderGroup}`).forEach((slider) => {
                        slider.classList.add('hover')
                    })
                },
                onMouseOut: () => {
                    document.querySelectorAll(`.sliderGroup-${sliderGroup}`).forEach((slider) => {
                        slider.classList.remove('hover')
                    })
                }
            } : {}}
        />
    )
}

const PanelSliderRoot = styled.div(({theme}) => ({
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'transparent',
    cursor: 'col-resize',
    transition: 'background-color 0.3s ease',
    '&.hover, &:hover': {
        backgroundColor: theme.colors.accentSolid10
    },
    '&.vertical': {
        top: 0,
        width: 6,
        height: '100%',
        cursor: 'col-resize',
        '&.start' : {
            left: -4
        },
        '&.end' : {
            right: -4
        },
        '&.joint': {
            height: 6,
            cursor: 'move',
            zIndex: 101
        }
    },
    '&.horizontal': {
        left: 0,
        width: '100%',
        height: 6,
        cursor: 'row-resize',
        '&.start' : {
            top: -3
        },
        '&.end' : {
            bottom: -4
        },
        '&.joint': {
            left: -3,
            width: 6,
            cursor: 'move',
            zIndex: 101
        }
    }
}))