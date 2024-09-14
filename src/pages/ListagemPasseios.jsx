import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth'; 
import './ListagemPasseios.css';

const ListagemPasseios = () => {
    const { usuarioLogado } = useAuth(); 
    const [passeios, setPasseios] = useState([]);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        // Carrega os passeios do localStorage ao montar o componente
        const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
        setPasseios(passeiosCadastrados);
      }, []);

      // Função para reservar um passeio
  const handleReserva = (passeio) => {
    if (usuarioLogado.tipoUsuario !== 'turista') {
      setMensagem('Apenas turistas podem realizar reservas.');
      return;
    }

     // Recupera as reservas do localStorage
     const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

     // Adiciona a nova reserva
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

      // Função para redirecionar ao dashboard
      const handleVoltar = () => {
      navigate('/dashboard-guia');
  };

  return (
    <div className="container mt-5">
      <h2>Listagem de Passeios</h2>

      {/* Exibe mensagens */}
      {mensagem && <p className="text-success">{mensagem}</p>}

      <div className="list-group">
        {passeios.length > 0 ? (
          passeios.map((passeio, index) => (
            <div key={index} className="list-group-item">
              <h4>{passeio.nomePasseio}</h4>
              <p>Local: {passeio.local}</p>
              <p>Descrição: {passeio.descricao}</p>
              <p>Preço: R$ {passeio.preco}</p>
              <p>Data: {passeio.data}</p>
              {usuarioLogado.tipoUsuario === 'turista' && (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleReserva(passeio)}
                >
                  Reservar
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum passeio disponível no momento.</p>
        )}
      </div>

      {/* Botão Voltar */}
      <button className="btn btn-secondary mt-4" onClick={handleVoltar}>
        Voltar ao Dashboard
      </button>
    </div>
  );
};

export default ListagemPasseios;