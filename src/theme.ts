import { sky, slate } from "@radix-ui/colors"
import { NumberIndex } from "./emotion"


const accentColorObj = {
    key: 'sky',
    obj: sky
}
const neutralColorObj = {
    key: 'slate',
    obj: slate
}
export const theme = {
    colors: {
        accent: {
            ...Object.entries(sky).reduce((acc, _, index) => {
                acc[index.toString()] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                return acc
            }, {} as Record<string, string>) as NumberIndex
        },
        neutral: {
            ...Object.entries(sky).reduce((acc, _, index) => {
                acc[index.toString()] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                return acc
            }, {} as Record<string, string>) as NumberIndex
        }
    }
}
