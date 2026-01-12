/// <reference types="vite/client" />

// Environment variables typing for better type safety and IntelliSense
// Extends Vite's default ImportMetaEnv interface
declare interface ImportMetaEnv {
    readonly VITE_API_URL?: string
    readonly VITE_TURNSTILE_SITE_KEY?: string
}
