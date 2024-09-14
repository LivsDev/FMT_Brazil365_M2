import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação interna
import './Navbar.css'; // Importa os estilos específicos do Navbar

function Navbar({ usuarioLogado, logout }) {
  return (
    <nav className="navbar">
      {/* Logo ou nome da aplicação */}
      <div className="navbar-brand">
        <Link to="/">Trip365</Link>
      </div>

      {/* Menu de navegação */}
      <ul className="navbar-menu">
        <li>
          <Link to="/dashboard-guia">Dashboard</Link>
        </li>
        <li>
          <Link to="/passeio/novo">Cadastrar Passeio</Link>
        </li>
        <li>
          <Link to="/passeios">Listar Passeios</Link>
        </li>
      </ul>

      {/* Informações do usuário e botão de logout */}
      <div className="navbar-user">
        <span>{usuarioLogado.nomeCompleto}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;