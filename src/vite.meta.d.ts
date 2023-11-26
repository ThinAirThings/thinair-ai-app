/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_NAME: string
    VITE_COGNITO_CLIENT_GRANT_TOKEN_REDIRECT_URL: string
    VITE_COGNITO_CLIENT_HOSTEDUI_URL_SIGN_IN: string
    VITE_COGNITO_CLIENT_ID: string
    VITE_AUTHENTICATION_API_BASE_URL: string
    VITE_COGNITO_USERPOOL_OAUTH_ENDPOINT: string
    VITE_COMPONENTS_API_BASE_URL: string
    // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
