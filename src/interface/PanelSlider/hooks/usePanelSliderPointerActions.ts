import { mousePoint } from "@thinairthings/mouse-utils"
import { useEffect } from "react"
import { fromEvent, takeUntil } from "rxjs"

export const usePanelSliderPointerActions = (
    orientation: 'vertical' | 'horizontal',
    location: 'start' | 'end',
    joint: boolean,
    referenceContainer: HTMLDivElement | null,
    target: HTMLDivElement | null,
    sliderControlledDimension: [number, number] | number,
    setter: (value: [number, number] | number
    ) => void
) => {
    useEffect(() => {
        if (!target || !referenceContainer) return
        const subscription = fromEvent<PointerEvent>(target, 'pointerdown')
        .subscribe((event) => {
            // Pointer Down
            document.body.setPointerCapture(event.pointerId)
            // Prevent default to avoid selecting text
            event.preventDefault()
            // Initial Dimensions
            const pointerDownPoint = mousePoint(event)
            const initialDimensions = sliderControlledDimension
            fromEvent<PointerEvent>(document.body, 'pointermove') 
            .pipe(
                takeUntil(fromEvent<PointerEvent, void>(document.body, 'pointerup', {}, () => {
                    // Pointer Up
                    document.body.releasePointerCapture(event.pointerId)
                }))
            )
            .subscribe((event) => {
                // Pointer Move
                const pointerMovePoint = mousePoint(event)
                if (orientation === 'horizontal' && location === 'start') {
                    if (joint === true) {
                        setter([
                            (initialDimensions as [number, number])[0] + (pointerMovePoint.x - pointerDownPoint.x), 
                            (initialDimensions as [number, number])[1] - (pointerMovePoint.y - pointerDownPoint.y)
                        ])
                    } else {
                        setter( (initialDimensions as number) - (pointerMovePoint.y - pointerDownPoint.y) )
                    }
                }
                if (orientation === 'horizontal' && location === 'end') {
                    setter(pointerMovePoint.y - referenceContainer.getBoundingClientRect().top)
                }
                if (orientation === 'vertical' && location === 'start') {
                    setter( referenceContainer.getBoundingClientRect().right - pointerMovePoint.x )
                }
                if (orientation === 'vertical' && location === 'end') {
                    setter(pointerMovePoint.x - referenceContainer.getBoundingClientRect().left)
                }
            })
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [target, referenceContainer, sliderControlledDimension])
}