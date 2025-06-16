import { useEffect, useState } from "react";
import { fetchAuthSession, getCurrentUser, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export const useSessionExpiration = () => {
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await fetchAuthSession({ forceRefresh: true });

                if (!session.tokens) {
                    setIsExpired(true);
                    await signOut();
                    navigate("/auth/login");
                    return;
                }

                await getCurrentUser();
                setIsExpired(false);

            } catch (err) {
                console.error("Session check failed:", err);
                const error = err as Error;
                if (
                    error.name === 'NotAuthorizedException' ||
                    error.name === 'UserNotConfirmedException' ||
                    error.name === 'TokenRefreshException' ||
                    error.message?.includes('refresh token')
                ) {
                    console.log("Authentication expired, logging out");
                    setIsExpired(true);
                    await signOut();
                    navigate("/auth/login");
                }
            }
        };
        checkSession();
        const interval = setInterval(checkSession, 10 * 60 * 1000); // Check every 10 minutes

        return () => clearInterval(interval);
    }, [navigate]);

    return { isExpired };
};