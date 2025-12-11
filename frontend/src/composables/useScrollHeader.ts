import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollHeader() {
    const isHidden = ref(false)
    let lastScrollY = 0

    const handleScroll = () => {
        const scrollY = window.scrollY
        isHidden.value = scrollY > lastScrollY
        lastScrollY = scrollY
    }

    onMounted(() =>
        window.addEventListener('scroll', handleScroll, { passive: true }))
    onUnmounted(() => window.removeEventListener('scroll', handleScroll))

    return { isHidden }
}
