import { useQuery } from "@tanstack/react-query"
import { useAuthentication } from "../../../../air-systems/Authentication.configure"



export const useComponentList = () => {
    const {protectedFetch} = useAuthentication()
    return useQuery({
        queryKey: ['component-list'],
        queryFn: async () => {
            return await protectedFetch(`https://${import.meta.env.COMPONENTS_API_BASE_URL}/get-component-list`) as {
                components: Array<{
                    componentId: string
                    ownerId: string
                    componentName: string
                }>
            }
        }
    })
}