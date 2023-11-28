


export const getCssVariable = (variableName: string) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}