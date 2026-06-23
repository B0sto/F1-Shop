import { refresh } from "@/services/providers/api/authApi";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react"

type AuthInitializerProps = {
    children: ReactNode
}

const AuthInitializer = ({ children }: AuthInitializerProps ) => {
    const [isReady, setIsReady] = useState(false);
    
    const queryClient = useQueryClient();

    useEffect(() => {
        const bootstrapAuth = async () => {
            try {
                const user = await refresh();

                queryClient.setQueryData(["me"], user);
            } catch {
                queryClient.setQueryData(["me"], null);
            } finally {
                setIsReady(true);
            }
        }

        bootstrapAuth();
    }, [queryClient])


    if (!isReady) return null;

    return children;
}


export default AuthInitializer;