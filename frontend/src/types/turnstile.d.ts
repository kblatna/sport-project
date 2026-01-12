/**
 * Cloudflare Turnstile widget types
 * Used for CAPTCHA verification in forms
 */

export interface TurnstileOptions {
    sitekey: string
    mode?: 'light' | 'dark'
    callback: (token: string) => void
}

export interface TurnstileWidget {
    render: (element: HTMLElement | null, options: TurnstileOptions) => void
}

declare global {
    interface Window {
        turnstile?: TurnstileWidget
    }
}
