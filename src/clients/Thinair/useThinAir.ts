import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useAuthentication } from "../../air-systems/Authentication.configure"



export const useThinAir: ThinAirApi = (path, method, params?) => {
    const {protectedFetch} = useAuthentication()
    const queryClient = useQueryClient()
    switch (method) {
        // NOTE: You need to add a schema check here and add missing properties if necessary
        case "GET": return useSuspenseQuery({
            queryKey: [...path, method, params],
            queryFn: async () => {
                return await protectedFetch(`https://${import.meta.env.VITE_MAIN_API_BASE_URL}/v1/${path.join('/')}`)
            }
        }) as any
        case "POST":
        case "DELETE": return useMutation({
            mutationFn: async (params) => {
                return protectedFetch(`https://${import.meta.env.VITE_MAIN_API_BASE_URL}/v1/${path.join('/')}`, {
                    method,
                    body: JSON.stringify(params)
                })
            },
            onSuccess: () => {
                if (method === 'DELETE') {
                    queryClient.invalidateQueries({queryKey: [...path.slice(0, -1), 'GET']})
                }
                if (method === 'POST') {
                    queryClient.invalidateQueries({queryKey: [...path, 'GET']})
                    queryClient.invalidateQueries({queryKey: [...path.slice(0, -1), 'GET']})
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
        'api_keys'
    ] | [
        'components', 
        string?,
        'data_files'?,
        string?
    ],
    M extends P extends ['authorize', 'api_keys']
    ? 'POST' | 'GET'
    : P extends ['components']
    ? 'POST' | 'GET'
    : P extends ['components', string]
    ? 'POST' | 'GET' | 'DELETE'
    : P extends ['components', string, 'data_files']
    ? 'POST' | 'GET'
    : P extends ['components', string, 'data_files', string]
    ? 'POST' | 'DELETE' | 'GET'
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
        : [P, M] extends [['components', string], 'POST']
        ? [[{
            componentName: string
        }], {
            success: boolean
        }]
        : [P, M] extends [['components', string], 'GET']
        ? [[], {
            component: {
                componentName: string,
                componentId: string,
                dataFiles: Record<string, {
                    fileType: string,
                    fileName: string,
                    include: boolean
                }>
            }
        }]
        : [P, M] extends [['components', string], 'DELETE']
        ? [[], {}]
        : [P, M] extends [['components', string, 'data_files'], 'POST']
        ? [[{
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
        : [P, M] extends [['components', string, 'data_files', string], 'POST']
        ? [[{
            include: boolean
        }], {
            message: string
        }]
        : [P, M] extends [['components', string, 'data_files', string], 'DELETE']
        ? [[], {}]
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