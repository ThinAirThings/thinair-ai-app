import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({ region: 'us-east-1' })
// https://vitejs.dev/config/
export default defineConfig(async () => {
    // NOTE!!: You may need to optimize this to use caching. You pay per 10,000 requests to SSM.
    const prefix = `/ThinAir/${process.env.NODE_ENV === 'production'?'prod':'dev'}`
    const paramIndex = {
        COGNITO_USERPOOL_OAUTH_ENDPOINT: `${prefix}/cognito/userpool/oauth_endpoint`,
        COGNITO_CLIENT_ID: `${prefix}/cognito/client/id`,
        COGNITO_CLIENT_GRANT_TOKEN_REDIRECT_URL: `${prefix}/cognito/client/grant_token_redirect_url`,
        COGNITO_CLIENT_HOSTEDUI_URL_SIGN_IN: `${prefix}/cognito/client/hostedui_url/sign_in`,
        AUTHENTICATION_API_BASE_URL: `${prefix}/rest_apis/AuthenticationApi/base_url`,
        COMPONENTS_API_BASE_URL: `${prefix}/rest_apis/ComponentsApi/base_url`,
    }
    const thinairCloudParams = await ssmClient.send(new GetParametersCommand({
        Names: Object.values(paramIndex)
    }))
    console.log(Object.entries(paramIndex).reduce((acc, [key, value]) => {
            acc[key] = JSON.stringify(thinairCloudParams.Parameters?.find(param => param.Name === value)?.Value)
            return acc
        }, {}))
    return {  
        plugins: [react()],
        define: Object.entries(paramIndex).reduce((acc, [key, value]) => {
            acc[`import.meta.env.${key}`] = JSON.stringify(thinairCloudParams.Parameters?.find(param => param.Name === value)?.Value)
            return acc
        }, {})
    }
})
