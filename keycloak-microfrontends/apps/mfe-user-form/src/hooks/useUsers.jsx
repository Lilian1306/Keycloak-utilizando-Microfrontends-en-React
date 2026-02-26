
import { useState } from 'react';
import { KEYCLOAK_CONFIG } from '../config';


export default function useUsers({token}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 

    const createUser = async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(KEYCLOAK_CONFIG.adminApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.username,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    enabled: true,
                    credentials: [{
                        type: "password",
                        value: userData.password,
                        temporary: false
                    }]
                })
            });
            if (!response.ok) {
             const errorText = await response.text();
             let errorMessage = 'Error creating user';
                
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.errorMessage || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                
                throw new Error(`${response.status}: ${errorMessage}`);
            }

            return true;
        } catch (error) {
            console.error("Error creating user:", error);
            setError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        createUser, 
        isLoading, 
        error,
        clearError: () => setError(null)
    };
}
