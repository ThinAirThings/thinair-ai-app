import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";


// Create a client
const queryClient = new QueryClient()
export const ReactQueryProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}