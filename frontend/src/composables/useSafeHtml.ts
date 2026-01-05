import DOMPurify, { type Config } from 'dompurify'

/**
 * Composable for safely rendering HTML content
 *
 * This is a temporary solution until we migrate to structured content (e.g., Tiptap JSON).
 * When implementing a WYSIWYG editor in the admin panel, consider:
 * 1. Using Tiptap or similar editor that outputs JSON format
 * 2. Storing structured content instead of HTML strings
 * 3. Creating a dedicated renderer component for the JSON format
 *
 * For now, this provides XSS protection by sanitizing HTML.
 */
export function useSafeHtml() {
    /**
     * Sanitizes HTML content to prevent XSS attacks
     *
     * @param dirty - The HTML string to sanitize
     * @param options - DOMPurify configuration options
     * @returns Sanitized HTML string safe for rendering with v-html
     */
    const sanitize = (
        dirty: string | undefined | null,
        options?: Config
    ): string => {
        if (!dirty) {
            return ''
        }

        // Default configuration - allows common formatting tags
        const defaultConfig: Config = {
            ALLOWED_TAGS: [
                'p', 'br', 'strong', 'em', 'u', 's', 'a',
                'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'blockquote', 'code', 'pre', 'span', 'div'
            ],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
            ALLOW_DATA_ATTR: false,
            // Force links to open in new tab and add security attributes
            FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
            FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
        }

        const config = { ...defaultConfig, ...options }

        return DOMPurify.sanitize(dirty, config)
    }

    return {
        sanitize
    }
}
