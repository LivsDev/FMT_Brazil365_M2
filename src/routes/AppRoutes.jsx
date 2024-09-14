import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';

function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
       
      </Routes>
    );
  }
  
  export default AppRoutes;