import { mousePoint } from "@thinairthings/mouse-utils"
import { useEffect } from "react"
import { fromEvent, takeUntil } from "rxjs"

export const usePanelSliderPointerActions = (
    orientation: 'vertical' | 'horizontal',
    location: 'start' | 'end',
    joint: boolean,
    target: HTMLDivElement | null,
    sliderControlledDimension: [number, number] | number,
    setter: (value: [number, number] | number
    ) => void
) => {
    useEffect(() => {
        if (!target) return
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
                    setter((initialDimensions as number) - (pointerMovePoint.y - pointerDownPoint.y))
                }
                if (orientation === 'vertical' && location === 'start') {
                    setter( (initialDimensions as number) + (pointerMovePoint.x - pointerDownPoint.x) )
                }
                if (orientation === 'vertical' && location === 'end') {
                    setter((initialDimensions as number) + (pointerMovePoint.x - pointerDownPoint.x))
                }
            })
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [target, sliderControlledDimension])
}