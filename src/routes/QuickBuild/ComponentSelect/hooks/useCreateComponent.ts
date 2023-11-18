import { useMutation } from "@tanstack/react-query";
import { useAuthentication } from "../../../../air-systems/Authentication.configure";



export const useCreateComponent = () => {
    // Mutations
    const {protectedFetch} = useAuthentication()
    return useMutation({
        mutationFn: async (componentName: string) => {
            return protectedFetch
        }
    })
}