import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useAuthentication } from "../../air-systems/Authentication.configure"



export const useThinAir: ThinAirApi = (path, method, params?) => {
    const {protectedFetch} = useAuthentication()
    const queryClient = useQueryClient()

    switch (method) {
        case "GET": return useSuspenseQuery({
            queryKey: [...path, method, params],
            queryFn: async () => {
                return await protectedFetch(`https://${import.meta.env.VITE_MAIN_API_BASE_URL}/v1/${path.join('/')}`)
            }
        }) as any
        case "POST":
        case "DELETE": return useMutation({
            mutationFn: async (params) => {
                const apiPath = path.includes('{id}') 
                    ? path.map((pathPart) => pathPart === '{id}' ? (params! as {id: string}).id : pathPart)
                    : path
                return protectedFetch(`https://${import.meta.env.VITE_MAIN_API_BASE_URL}/v1/${apiPath.join('/')}`, {
                    method,
                    body: JSON.stringify(params)
                })
            },
            onSuccess: (_, params) => {
                const apiPath = path.includes('{id}') 
                    ? path.map((pathPart) => pathPart === '{id}' ? (params! as {id: string}).id : pathPart)
                    : path
                if (method === 'DELETE') {
                    queryClient.invalidateQueries({queryKey: [...apiPath.slice(0, -1), 'GET']})
                }
                if (method === 'POST') {
                    queryClient.invalidateQueries({queryKey: [...apiPath, 'GET']})
                    queryClient.invalidateQueries({queryKey: [...apiPath.slice(0, -1), 'GET']})
                }
            }
        })
        default:
            const _exhaustiveCheck: never = method
            throw new Error(`Unhandled method case: ${_exhaustiveCheck}`);
    }
}

type ThinAirApi = <
    P extends [
        'authorize',
        'api_keys',
        '{id}'
    ] | [
        'components', 
        (string | '{id}')?,
        'data_files'?,
    ],
    M extends P extends ['authorize', 'api_keys']
    ? 'POST' | 'GET'
    : P extends ['components']
    ? 'POST' | 'GET'
    : P extends ['components', '{id}'|string]
    ? 'POST' | 'GET' | 'DELETE'
    : P extends ['components', '{id}'|string, 'data_files']
    ? 'POST' | 'GET'
    : never,
    IO extends [P, M] extends [['authorize', 'api_keys'], 'POST']
        ? [[], {
            apiKey: string
        }]
        : [P, M] extends [['authorize', 'api_keys'], 'GET']
        ? [[], {
            apiKeys: Array<string>
        }]
        : [P, M] extends [['components'], 'POST']
        ? [[{
            componentName: string
        }], {
            componentId: string
        }]
        : [P, M] extends [['components'], 'GET']
        ? [[], {
            components: Record<string, {
                componentName: string
            }>
        }]
        : [P, M] extends [['components', '{id}'], 'POST']
        ? [[{
            id: string,
            componentName: string
        }], {
            success: boolean
        }]
        : [P, M] extends [['components', string], 'GET']
        ? [[], {
            component: {
                componentName: string,
                dataFiles: Record<string, {
                    fileType: string,
                    fileName: string,
                }>
            }
        }]
        : [P, M] extends [['components', '{id}'], 'DELETE']
        ? [[{
            id: string
        }], {}]
        : [P, M] extends [['components', '{id}', 'data_files'], 'POST']
        ? [[{
            id: string,
            fileType: string,
            fileName: string,
            fileData: string
        }], {
            message: string
        }]
        : [P, M] extends [['components', string, 'data_files'], 'GET']
        ? [[], {
            dataFiles: Record<string, {
                fileType: string,
                fileName: string,
                include: boolean
            }>
        }]
        : never
>(
    path: P, 
    method: M, 
    ...params: M extends 'GET' ? IO[0] : []
) => M extends 'GET' 
    ? ReturnType<typeof useSuspenseQuery<IO[1], Error, IO[1], [...P, M, ...IO[0]]>>
    : M extends 'POST' | 'DELETE'
    ? ReturnType<typeof useMutation<IO[1], Error, IO[0][0]>>
    : never