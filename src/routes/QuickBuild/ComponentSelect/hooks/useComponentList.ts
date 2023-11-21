import { useQuery } from "@tanstack/react-query"
import { useAuthentication } from "../../../../air-systems/Authentication.configure"



export const useComponentList = () => {
    const {protectedFetch} = useAuthentication()
    return useQuery({
        queryKey: ['component-list'],
        queryFn: async () => {
            return await protectedFetch(`https://${import.meta.env.MAIN_API_BASE_URL}/v1/components`) as {
                components: Array<{
                    componentId: string
                    ownerId: string
                    componentName: string
                }>
            }
        }
    })
}