/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_NAME: string
    COGNITO_CLIENT_GRANT_TOKEN_REDIRECT_URL: string
    COGNITO_CLIENT_HOSTEDUI_URL_SIGN_IN: string
    COGNITO_CLIENT_ID: string
    AUTHENTICATION_API_BASE_URL: string
    COGNITO_USERPOOL_OAUTH_ENDPOINT: string
    COMPONENTS_API_BASE_URL: string
    // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
