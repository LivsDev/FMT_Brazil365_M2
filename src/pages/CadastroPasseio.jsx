import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { salvarPasseio } from '../services/passeioService'; // Importa a função para salvar passeio
import { useNavigate } from 'react-router-dom';
import './Form.css';

function CadastroPasseio() {
    const { usuarioLogado } = useAuth(); // Obtém o usuário logado
    const navigate = useNavigate(); // Hook para navegação
    const [formValues, setFormValues] = useState({
      nome: '',
      local: '',
      descricao: '',
      preco: '',
      data: '',
    });

    const [errors, setErrors] = useState({}); // Estado para armazenar erros de validação

    // Função para lidar com mudanças nos campos do formulário
      const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    };

     // Função para validar o formulário
    const validateForm = () => {
    const newErrors = {};

 // Validações dos campos (nome, local, descrição, preço, data)
 setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        salvarPasseio({
          ...formValues,
          emailGuia: usuarioLogado.email,
        });
        // Após salvar, redireciona para o dashboard
        navigate('/dashboard-guia');
      } catch (error) {
        // Lide com erros ao salvar o passeio
        console.error(error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Novo Passeio</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nome */}
        <div className="form-field">
          <label htmlFor="nome">Nome do Passeio</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className="error-message">{errors.nome}</span>}
        </div>

        {/* Outros campos do formulário (local, descrição, preço, data) */}
        {/* ... */}

        <button type="submit" className="form-button">
          Cadastrar Passeio
        </button>
      </form>
    </div>
  );
}

export default CadastroPasseio;

