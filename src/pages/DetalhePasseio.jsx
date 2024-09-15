import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para obter os parâmetros da URL e navegar
import { useAuth } from '../contexts/useAuth'; 
import './DetalhePasseio.css'; // Importar o CSS personalizado

const DetalhePasseio = () => {
    const { id } = useParams(); // Obtém o ID do passeio da URL
    const { usuarioLogado } = useAuth(); // Obtém o usuário logado do contexto
    const [passeio, setPasseio] = useState(null);
    const [mensagem, setMensagem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Carrega os passeios do localStorage
        const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
        const passeioEncontrado = passeiosCadastrados.find((p) => p.nomePasseio === id);
        setPasseio(passeioEncontrado);
      }, [id]);

      // Função para reservar o passeio
  const handleReserva = () => {
    if (usuarioLogado.tipoUsuario !== 'turista') {
      setMensagem('Apenas turistas podem fazer reservas.');
      return;
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const novaReserva = {
      passeioId: passeio.nomePasseio,
      turistaEmail: usuarioLogado.email,
      data: passeio.data,
      local: passeio.local,
    };

    reservas.push(novaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    setMensagem('Reserva realizada com sucesso!');
  };

  // Função para excluir o passeio
  const handleExcluir = () => {
    if (usuarioLogado.tipoUsuario !== 'guia') {
      setMensagem('Apenas o guia pode excluir este passeio.');
      return;
    }

    const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
    const passeiosAtualizados = passeiosCadastrados.filter((p) => p.nomePasseio !== id);
    localStorage.setItem('passeios', JSON.stringify(passeiosAtualizados));
    setMensagem('Passeio excluído com sucesso!');
    navigate('/dashboard-guia'); // Redireciona para o dashboard após exclusão
  };

  // Função para redirecionar à página de edição 
  const handleEditar = () => {
    if (usuarioLogado.tipoUsuario !== 'guia') {
      setMensagem('Apenas o guia pode editar este passeio.');
      return;
    }
    navigate(`/passeio/editar/${id}`);
  };

  if (!passeio) {
    return <p>Carregando passeio...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Detalhes do Passeio</h2>
      <div className="detalhe-passeio">
        <h4>{passeio.nomePasseio}</h4>
        <p><strong>Local:</strong> {passeio.local}</p>
        <p><strong>Descrição:</strong> {passeio.descricao}</p>
        <p><strong>Preço:</strong> R$ {passeio.preco}</p>
        <p><strong>Data:</strong> {passeio.data}</p>
      </div>

      {/* Exibe mensagens */}
      {mensagem && <p className="text-success">{mensagem}</p>}

      {/* Botão de reserva para turistas */}
      {usuarioLogado.tipoUsuario === 'turista' && (
        <button className="btn btn-success mt-3" onClick={handleReserva}>
          Reservar
        </button>
      )}

      {/* Botões de edição e exclusão para guias */}
      {usuarioLogado.tipoUsuario === 'guia' && (
        <>
          <button className="btn btn-warning mt-3 mr-2" onClick={handleEditar}>
            Editar Passeio
          </button>
          <button className="btn btn-danger mt-3" onClick={handleExcluir}>
            Excluir Passeio
          </button>
        </>
      )}

      {/* Botão para voltar à lista de passeios */}
      <button className="btn btn-secondary mt-4" onClick={() => navigate('/passeios')}>
        Voltar à Lista de Passeios
      </button>
    </div>
  );
};

export default DetalhePasseio;
