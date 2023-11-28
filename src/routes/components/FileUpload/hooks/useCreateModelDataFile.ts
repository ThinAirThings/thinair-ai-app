import { useMutation } from "@tanstack/react-query"
import { useStateStore } from "../../../../storage/useStateStore"
import { useAuthentication } from "../../../../air-systems/Authentication.configure"
import { convertFileToBase64 } from "../file-utils"


export const useCreateModelDataFile = () => {
    const {protectedFetch} = useAuthentication()
    const selectedComponentId = useStateStore((state) => state.selectedComponentId)
    return useMutation({
        mutationFn: async (file: File) => {
            return await protectedFetch(`https://${import.meta.env.MAIN_API_BASE_URL}/v1/components/${selectedComponentId}/data_files`, {
                method: 'POST',
                body: JSON.stringify({
                    fileType: file.type,
                    fileDirectory: 'data_files',
                    fileName: file.name,
                    fileData: await convertFileToBase64(file),
                })
            })
        }
    })
}