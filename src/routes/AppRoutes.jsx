import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import DashboardGuia from '../pages/DashboardGuia'; // Importa o DashboardGuia
import PrivateRouteGuia from './PrivateRouteGuia'; // Importa a rota privada para guias
import CadastroPasseio from '../pages/CadastroPasseio';
import ListagemPasseios from '../pages/ListagemPasseios';
import DetalhePasseio from '../pages/DetalhePasseio';

function AppRoutes() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/passeio/novo" element={<CadastroPasseio />} />
        <Route path="/passeios" element={<ListagemPasseios />} />
        <Route path="/passeio/:id" element={<DetalhePasseio />} />
        
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