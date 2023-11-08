"use client"
import { useLocalUser } from "@/hooks"
import { userContext } from "@/utils/context"

interface Props {
    children: React.ReactNode
}
export const UserProvider: React.FC<Props> = ({ children }) => {
    const userValues = useLocalUser()
    return (
        <userContext.Provider value={userValues}>
            {children}
        </userContext.Provider>
    )
}