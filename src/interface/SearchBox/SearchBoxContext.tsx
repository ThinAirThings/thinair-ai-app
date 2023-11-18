import { createRootDivPortal } from "@thinairthings/react-utils";
import { FC, ReactNode, createContext, useCallback, useContext, useState } from "react";
import { SearchBox } from "./SearchBox";
import { useSearchBoxToggleControls } from "./hooks/useSearchBoxToggleControls";


const SearchBoxContext = createContext<{
    setSearchBoxActive: (state: boolean) => void
}>(null as any);

export const useSetSearchBoxActive = () => useContext(SearchBoxContext).setSearchBoxActive

export const SearchBoxProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    // State
    const [searchBoxActive, setSearchBoxActive] = useState(false)
    const setSearchBoxState = useCallback((state: boolean) => {
        setSearchBoxActive(state)
    }, [])
    // Hooks
    useSearchBoxToggleControls(setSearchBoxState)
    return (
        <SearchBoxContext.Provider value={{setSearchBoxActive}}>
            {children}
            {searchBoxActive && createRootDivPortal(
                <SearchBox/>
            )}
        </SearchBoxContext.Provider>
    )
}