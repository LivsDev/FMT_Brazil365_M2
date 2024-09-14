import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  // Função para fazer login
  const login = (usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  };

  // Função para fazer logout
  const logout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//validação de PropTypes para 'children'
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};