import { useToast } from 'primevue/usetoast'

export type NotificationType = 'success' | 'info' | 'warn' | 'error'

export interface NotificationOptions {
    title?: string
    message: string
    type?: NotificationType
    life?: number
}

/**
 * Composable for displaying toast notifications throughout the application
 * Uses PrimeVue Toast service for consistent user feedback
 */
export function useNotifier() {
    const toast = useToast()

    const notify = (options: NotificationOptions) => {
        const { title, message, type = 'info', life = 5000 } = options

        toast.add({
            severity: type,
            summary: title,
            detail: message,
            life
        })
    }

    const success = (message: string, title = 'Úspěch') => {
        notify({ message, title, type: 'success' })
    }

    const error = (message: string, title = 'Chyba') => {
        notify({ message, title, type: 'error' })
    }

    const warning = (message: string, title = 'Upozornění') => {
        notify({ message, title, type: 'warn' })
    }

    const info = (message: string, title = 'Informace') => {
        notify({ message, title, type: 'info' })
    }

    return {
        notify,
        success,
        error,
        warning,
        info
    }
}
