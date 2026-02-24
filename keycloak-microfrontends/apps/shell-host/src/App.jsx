import { Suspense, lazy, useState } from "react";
import keycloak from "../keycloak.js";

const UserList = lazy(() => import('mfeUserList/UserList'))


export default function App({token}) {
  const [currentView, setCurrentView] = useState('dashboard')
  const userInfo = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const handleLogout = () => {
    keycloak.logout()
  }

  const renderContent = () => {
    switch(currentView) {
      case 'users':
        return (
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-600">Cargando lista de usuarios</div>
            </div>
          }>
            <UserList token={token}/>
          </Suspense>
        )
        case 'create-user':
          return (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear Usuario</h2>
              <p className="text-gray-600">Funcionalidad proximamente</p>
            </div>
          )
       
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Keycloak User Management</h1>
          <div className="flex items-center space-x-4">
            {userInfo && (
              <span className="text-gray-200">Hola, {userInfo.preferred_username}</span>
            )}
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
            >
              Salir
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="flex">
          
          <button 
            onClick={() => setCurrentView('users')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              currentView === 'users'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Listado de Usuarios
          </button>
          <button 
            onClick={() => setCurrentView('create-user')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
              currentView === 'create-user'
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Crear Usuario
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  )
}
