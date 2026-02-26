
import UserForm from './components/UserForm';
import {ToastContainer } from 'react-toastify'

export default function App({ token, onSucess }) { 
  if (!token) {
    return (
      <div className="bg-yellow-100 p-4 rounded">Falta Token de autenticación</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <UserForm token={token} onSucess={onSucess} />

      <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
      />
    </div>
  );
}