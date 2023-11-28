import { greenDark, greenDarkA, redDark, redDarkA, sky, skyA, skyDark, skyDarkA, slate, slateA, slateDark, slateDarkA } from "@radix-ui/colors"


const accentColorObj = {
    key: 'sky',
    obj: skyDark,
    objA: skyDarkA
}
const neutralColorObj = {
    key: 'slate',
    obj: slateDark,
    objA: slateDarkA
}
const successColorObj = {
    key: 'green',
    obj: greenDark,
    objA: greenDarkA
}
const dangerColorObj = {
    key: 'red',
    obj: redDark,
    objA: redDarkA
}
export const theme = {
    colors: {
        // Accents
        ...Object.entries(accentColorObj.obj).reduce((acc, _, index) => {
            index += 1
            acc[`accent${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
            if (index <= 2) {
                acc[`accentBackground${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                acc[`accentBackgroundA${index.toString()}`] = accentColorObj.objA[`${accentColorObj.key}A${index}` as keyof typeof accentColorObj.objA]
            }
            if (2 < index && index <= 5) {
                acc[`accentInteractive${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                acc[`accentInteractiveA${index.toString()}`] = accentColorObj.objA[`${accentColorObj.key}A${index}` as keyof typeof accentColorObj.objA]
            }
            if (6 < index && index <= 8) {
                acc[`accentBorders${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                acc[`accentBordersA${index.toString()}`] = accentColorObj.objA[`${accentColorObj.key}A${index}` as keyof typeof accentColorObj.objA]
            }
            if (9 < index && index <= 10) {
                acc[`accentSolid${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                acc[`accentSolidA${index.toString()}`] = accentColorObj.objA[`${accentColorObj.key}A${index}` as keyof typeof accentColorObj.objA]
            }
            if (11 < index && index <= 12) {
                acc[`accentText${index.toString()}`] = accentColorObj.obj[`${accentColorObj.key}${index}` as keyof typeof accentColorObj.obj]
                acc[`accentTextA${index.toString()}`] = accentColorObj.objA[`${accentColorObj.key}A${index}` as keyof typeof accentColorObj.objA]
            }
            return acc
        }, {} as Record<string, string>),
        // Neutrals
        ...Object.entries(neutralColorObj.obj).reduce((acc, _, index) => {
            index += 1
            acc[`neutral${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
            if (index < 3) {
                acc[`neutralBackground${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                acc[`neutralBackgroundA${index.toString()}`] = neutralColorObj.objA[`${neutralColorObj.key}A${index}` as keyof typeof neutralColorObj.objA]
            }
            if (index < 6) {
                acc[`neutralInteractive${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                acc[`neutralInteractiveA${index.toString()}`] = neutralColorObj.objA[`${neutralColorObj.key}A${index}` as keyof typeof neutralColorObj.objA]
            }
            if (index < 9) {
                acc[`neutralBorders${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                acc[`neutralBordersA${index.toString()}`] = neutralColorObj.objA[`${neutralColorObj.key}A${index}` as keyof typeof neutralColorObj.objA]
            }
            if (index < 11) {
                acc[`neutralSolid${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                acc[`neutralSolidA${index.toString()}`] = neutralColorObj.objA[`${neutralColorObj.key}A${index}` as keyof typeof neutralColorObj.objA]
            }
            if (index < 13) {
                acc[`neutralText${index.toString()}`] = neutralColorObj.obj[`${neutralColorObj.key}${index}` as keyof typeof neutralColorObj.obj]
                acc[`neutralTextA${index.toString()}`] = neutralColorObj.objA[`${neutralColorObj.key}A${index}` as keyof typeof neutralColorObj.objA]
            }
            return acc
        }, {} as Record<string, string>),
        // Success
        ...Object.entries(successColorObj.obj).reduce((acc, _, index) => {
            index += 1
            acc[`success${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
            if (index < 3) {
                acc[`successBackground${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
                acc[`successBackgroundA${index.toString()}`] = successColorObj.objA[`${successColorObj.key}A${index}` as keyof typeof successColorObj.objA]
            }
            if (index < 6) {
                acc[`successInteractive${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
                acc[`successInteractiveA${index.toString()}`] = successColorObj.objA[`${successColorObj.key}A${index}` as keyof typeof successColorObj.objA]
            }
            if (index < 9) {
                acc[`successBorders${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
                acc[`successBordersA${index.toString()}`] = successColorObj.objA[`${successColorObj.key}A${index}` as keyof typeof successColorObj.objA]
            }
            if (index < 11) {
                acc[`successSolid${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
                acc[`successSolidA${index.toString()}`] = successColorObj.objA[`${successColorObj.key}A${index}` as keyof typeof successColorObj.objA]
            }
            if (index < 13) {
                acc[`successText${index.toString()}`] = successColorObj.obj[`${successColorObj.key}${index}` as keyof typeof successColorObj.obj]
                acc[`successTextA${index.toString()}`] = successColorObj.objA[`${successColorObj.key}A${index}` as keyof typeof successColorObj.objA]
            }
            return acc
        }, {} as Record<string, string>),
        // Danger
        ...Object.entries(dangerColorObj.obj).reduce((acc, _, index) => {
            index += 1
            acc[`danger${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
            if (index < 3) {
                acc[`dangerBackground${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
                acc[`dangerBackgroundA${index.toString()}`] = dangerColorObj.objA[`${dangerColorObj.key}A${index}` as keyof typeof dangerColorObj.objA]
            }
            if (index < 6) {
                acc[`dangerInteractive${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
                acc[`dangerInteractiveA${index.toString()}`] = dangerColorObj.objA[`${dangerColorObj.key}A${index}` as keyof typeof dangerColorObj.objA]
            }
            if (index < 9) {
                acc[`dangerBorders${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
                acc[`dangerBordersA${index.toString()}`] = dangerColorObj.objA[`${dangerColorObj.key}A${index}` as keyof typeof dangerColorObj.objA]
            }
            if (index < 11) {
                acc[`dangerSolid${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
                acc[`dangerSolidA${index.toString()}`] = dangerColorObj.objA[`${dangerColorObj.key}A${index}` as keyof typeof dangerColorObj.objA]
            }
            if (index < 13) {
                acc[`dangerText${index.toString()}`] = dangerColorObj.obj[`${dangerColorObj.key}${index}` as keyof typeof dangerColorObj.obj]
                acc[`dangerTextA${index.toString()}`] = dangerColorObj.objA[`${dangerColorObj.key}A${index}` as keyof typeof dangerColorObj.objA]
            }
            return acc
        }, {} as Record<string, string>),
        // Contrast
        accentContrast: ['sky', 'mint', 'lime', 'yellow', 'amber'].includes(accentColorObj.key) 
            ? slate.slate12 
            : 'white',
        neutralContrast: accentColorObj.objA[`${accentColorObj.key}A11` as keyof typeof accentColorObj.objA]
    }
}
