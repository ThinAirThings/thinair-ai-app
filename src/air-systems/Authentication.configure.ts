import {configureAuthentication} from '@thinairthings/air-authentication'
import { Loading } from '../views/Loading/Loading'


export const {
    AuthenticationProvider,
    ProtectedRoute,
    useAuthentication
} = configureAuthentication({
    authenticationApiBaseUrl: import.meta.env.VITE_MAIN_API_BASE_URL,
    oauthEndpoint: import.meta.env.VITE_COGNITO_USERPOOL_OAUTH_ENDPOINT,
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    grantTokenRedirectUrl: import.meta.env.VITE_COGNITO_CLIENT_GRANT_TOKEN_REDIRECT_URL,
    Loading: Loading
})
