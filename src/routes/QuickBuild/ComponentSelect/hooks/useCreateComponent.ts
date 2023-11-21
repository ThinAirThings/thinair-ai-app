import { useMutation } from "@tanstack/react-query";
import { useAuthentication } from "../../../../air-systems/Authentication.configure";


export const useCreateComponent = () => {
    // Mutations
    const {protectedFetch} = useAuthentication()
    return useMutation({
        mutationFn: async (componentName: string) => {
            return protectedFetch(`https://${import.meta.env.MAIN_API_BASE_URL}/v1/components`, {
                method: 'POST',
                body: JSON.stringify({componentName})
            })
        }
    })
}