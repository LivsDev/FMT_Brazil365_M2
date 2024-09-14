import React, { useState } from 'react';
import './CadastroUsuario.css'; // Arquivo CSS personalizado
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('turista'); // Valor padrão: 'turista'
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Função para salvar o usuário no localStorage
  const handleCadastro = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    setError(null); // Limpa os erros anteriores
    setSuccessMessage(''); // Limpa a mensagem de sucesso anterior

    // Validação da senha
    console.log('Validando a senha:', senha);
    if (senha.length < 8 || !/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      setError('A senha deve ter no mínimo 8 caracteres e conter letras e números.');
      return;
    }

    // Verifica se o email já existe no localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = storedUsers.some(user => user.email === email);

    if (emailExists) {
      setError('Este e-mail já está cadastrado. Use um e-mail diferente.');
      return;
    }

    // Cria o novo usuário com e-mail e senha
    const newUser = { nome, email, password: senha, tipo: tipoUsuario };
    const updatedUsers = [...storedUsers, newUser];

    // Salva no localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log('Usuário cadastrado com sucesso:', newUser);

    // Exibe mensagem de sucesso
    setSuccessMessage('Usuário cadastrado com sucesso! Agora faça login.');
    
    // Redireciona para a página de login após um tempo de exibição da mensagem de sucesso
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div id="cadastro-wrapper" className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card border-0">
            <div className="card-body">
              <h3 className="h4 font-weight-bold text-center mb-4">Cadastro de Usuário</h3>

              {/* Exibição de mensagem de sucesso */}
              {successMessage && <p className="text-success text-center">{successMessage}</p>}

              {/* Exibição de erro, caso ocorra */}
              {error && <p className="text-danger">{error}</p>}

              {/* Formulário de Cadastro */}
              <form onSubmit={handleCadastro}>
                {/* Nome Completo */}
                <div className="form-group mb-3">
                  <label htmlFor="nome">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                {/* E-mail */}
                <div className="form-group mb-3">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Senha */}
                <div className="form-group mb-3">
                  <label htmlFor="senha">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>

                {/* Tipo de Usuário */}
                <div className="form-group mb-4">
                  <label htmlFor="tipoUsuario">Tipo de Usuário</label>
                  <select
                    className="form-control"
                    id="tipoUsuario"
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                  >
                    <option value="turista">Turista</option>
                    <option value="guia">Guia Turístico</option>
                  </select>
                </div>

                {/* Botão de Cadastro */}
                <button type="submit" className="btn btn-success btn-block">Cadastrar</button>
              </form>

              <p className="text-center mt-3">
                Já tem uma conta?{' '}
                <a href="/login" className="text-primary">Faça login aqui</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;


