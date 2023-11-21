import { useQuery } from "@tanstack/react-query"
import { useAuthentication } from "../../../../air-systems/Authentication.configure"
import { useStateStore } from "../../../../storage/useStateStore"



export const useDataFiles = () => {
    const {protectedFetch} = useAuthentication()
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    return useQuery({
        queryKey: ['components', selectedComponentId, 'data_files'],
        queryFn: async () => {
            return await protectedFetch(`https://${import.meta.env.MAIN_API_BASE_URL}/v1/components/${selectedComponentId}/data_files`) as {
                dataFiles: Array<string>
            }
        }
    })
}