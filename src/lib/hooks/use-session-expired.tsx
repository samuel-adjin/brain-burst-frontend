import { useEffect, useState } from "react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom"; // or useRouter() if using Next.js

export const useSessionExpiration = () => {
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate(); // or useRouter() for Next.js

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await fetchAuthSession();
                const expirationDate = session.credentials?.expiration;

                if (!expirationDate) {
                    setIsExpired(true);
                    await signOut();
                    navigate("/login");
                    return;
                }

                const now = new Date();

                if (expirationDate.getTime() < now.getTime()) {
                    setIsExpired(true);
                    await signOut();
                    navigate("/login");
                }
            } catch (err) {
                console.error("Error checking session:", err);
                setIsExpired(true);
                await signOut();
                navigate("/login");
            }
        };

        const interval = setInterval(checkSession, 60 * 1000); // check every 1 min
        checkSession(); // initial check on mount

        return () => clearInterval(interval);
    }, [navigate]);

    return { isExpired };
};
