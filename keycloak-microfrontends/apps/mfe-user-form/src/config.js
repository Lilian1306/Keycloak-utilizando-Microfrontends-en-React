
export const KEYCLOAK_CONFIG = {
  baseUrl: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  adminApiUrl: `${import.meta.env.VITE_KEYCLOAK_URL}/admin/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/users`
};