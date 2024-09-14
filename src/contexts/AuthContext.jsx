import React, { createContext, useState, useContext } from 'react';

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
// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
    return useContext(AuthContext);
  }
  