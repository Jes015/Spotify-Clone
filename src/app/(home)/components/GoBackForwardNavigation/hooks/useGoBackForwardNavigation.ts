import { useRouter } from "next/navigation"

export const useGoBackForwardNavigation = () => {
    const router = useRouter()

    const goForward = () => {
        router.forward()
    }

    const goBack = () => {
        router.back()
    }

    return { goForward, goBack }
}