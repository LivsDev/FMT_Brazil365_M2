import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import DashboardGuia from '../pages/DashboardGuia'; // Importa o DashboardGuia
import PrivateRouteGuia from './PrivateRouteGuia'; // Importa a rota privada para guias
//

function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />

        {/* Rota protegida para o Dashboard do Guia */}
        <Route
        path="/dashboard-guia"
        element={
          <PrivateRouteGuia>
            <DashboardGuia />
          </PrivateRouteGuia>
        }
      />
      </Routes>
    );
  }
  
  export default AppRoutes;