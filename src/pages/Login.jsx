import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para inicializar usuários simulados no localStorage
  useEffect(() => {
    const users = [
      { username: 'admin', password: '123456' },
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' }
    ];

    // Verifica se os usuários já estão no localStorage, senão, os insere
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Usuários simulados inseridos no localStorage.');
    } else {
      console.log('Usuários já estão no localStorage.');
    }
  }, []);

  // Função para realizar o login
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Verificar se o localStorage contém os usuários
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      setError('Não há usuários no localStorage. Tente novamente.');
      console.log('Erro: Usuários não estão no localStorage');
      return;
    }

    const users = JSON.parse(storedUsers) || [];
    console.log("Tentando login com:", username, password);
    console.log("Usuários no localStorage:", users);

    // Verifica se o usuário e senha existem na lista de usuários simulados
    const user = users.find(user => user.email === username && user.senha === password);
    
    if (user) {
      // Login bem-sucedido, armazena no localStorage e redireciona
      console.log("Usuário encontrado:", user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      navigate('/dashboard');  // Redireciona para o dashboard em caso de sucesso
    } else {
      // Exibe mensagem de erro se as credenciais forem inválidas
      setError('Usuário ou senha incorretos');
      console.log("Usuário ou senha incorretos.");
    }
  };
  return (
    <div id="main-wrapper" className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-xl-10">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="mb-5">
                      <img src="/src/assets/Brazil365.png" alt="Brazil365 Logo" className="logo-image" />
                    </div>

                    <h3 className="h4 font-weight-bold text-theme">
                      Explorando as belezas do Brasil, um guia de cada vez.
                    </h3>
                    <p className="text-muted mt-2 mb-5">Digite seus dados de acesso</p>

                    {/* Formulário de Login */}
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="username">Usuário</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group mb-5">
                        <label htmlFor="password">Senha</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      {/* Exibição de erro, caso ocorra */}
                      {error && <p className="text-danger">{error}</p>}

                      {/* Botão de Login */}
                      <button type="submit" className="btn btn-success">Log in</button>

                      <a href="#!" className="forgot-link float-right text-primary">Esqueceu a senha?</a>
                    </form>
                  </div>
                </div>

                <div className="col-lg-5 d-none d-lg-inline-block">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right"></div>
                    <div className="account-testimonial">
                      <h4 className="text-white mb-4">We are more than just a company</h4>
                      <p className="lead text-white">"Best investment I made for a long time. Can only recommend it for other users."</p>
                      <p>- Admin User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end card-body */}
          </div>
          {/* end card */}
          <p className="text-muted text-center mt-3 mb-0">
            Não tem uma conta?{' '}
            <a href="#!" className="text-danger ml-1">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
