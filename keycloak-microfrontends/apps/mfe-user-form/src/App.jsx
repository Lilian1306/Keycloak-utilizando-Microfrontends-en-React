
import UserForm from './components/UserForm';

export default function App({ token, onSucess }) { 
  if (!token) {
    return (
      <div className="bg-yellow-100 p-4 rounded">Falta Token de autenticación</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <UserForm token={token} onSucess={onSucess} />
    </div>
  );
}