import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import keycloak from '../keycloak.js'

keycloak.init({
  onLoad: "login-required",
  checkLoginIframe: false,
  pkceMethod: 'S256'
}).then((authenticated) => {
  if(authenticated) {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App token={keycloak.token}/>
      </StrictMode>
    );
  } else {
    console.error("Usuario no autenticado");
    keycloak.login();
  }
}).catch((error) => {
  console.error("Error en la autenticación:", error);
})