
import { KEYCLOAK_CONFIG } from '../config';


export default function useUsers({token}) {
    const createUser = async (userData) => {
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
                        temporary: true
                    }]
                })
            });
            return response.ok; 
        } catch(error) {
            console.error("Error creating user:", error);
            return false;
        }
    }
  return {createUser};
}
