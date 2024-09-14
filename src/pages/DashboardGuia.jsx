import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { getPasseiosByGuia } from '../services/passeioService'; // Importa a função para obter passeios do guia
import Navbar from '../components/Navbar';
import './DashboardGuia.css'; // Importa o CSS específico do DashboardGuia

function DashboardGuia() {
  const { usuarioLogado, logout } = useAuth(); // Obtém o usuário logado e a função de logout do contexto de autenticação
  const [passeios, setPasseios] = useState([]); // Estado para armazenar os passeios do guia

  useEffect(() => {
    // Executa quando o componente é montado ou quando o usuário logado é alterado
    const passeiosDoGuia = getPasseiosByGuia(usuarioLogado.email); // Obtém os passeios cadastrados pelo guia logado
    setPasseios(passeiosDoGuia); // Atualiza o estado com os passeios obtidos
  }, [usuarioLogado]);

  return (
    <div className="dashboard-container">
      {/* Componente de navegação */}
      <Navbar usuarioLogado={usuarioLogado} logout={logout} />

      {/* Conteúdo principal do dashboard */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Bem-vindo, {usuarioLogado.nomeCompleto}</h1>
        </header>

        {/* Card exibindo a quantidade de passeios cadastrados */}
        <div className="dashboard-card">
          <h2>Passeios Cadastrados</h2>
          <p>{passeios.length}</p>
        </div>

        {/* Ações disponíveis para o guia */}
        <div className="dashboard-actions">
          <a href="/passeio/novo" className="dashboard-button">
            Cadastrar Novo Passeio
          </a>
          <a href="/passeios" className="dashboard-button">
            Listar Passeios
          </a>
        </div>
      </main>
    </div>
  );
}

export default DashboardGuia;