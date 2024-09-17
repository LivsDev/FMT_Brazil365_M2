import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import './Reservas.css';

const Reservas = () => {
    const { usuarioLogado } = useAuth(); // Obtém o usuário logado do contexto
    const [reservas, setReservas] = useState([]);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        // Verifica se o usuário é um turista
        if (usuarioLogado.tipoUsuario !== 'turista') {
            setMensagem('Apenas turistas autenticados podem acessar suas reservas.');
            return;
        }

        // Carrega as reservas do localStorage
        const reservasCadastradas = JSON.parse(localStorage.getItem('reservas')) || [];
        // Filtra as reservas do turista logado
        const reservasDoTurista = reservasCadastradas.filter((reserva) => reserva.turistaEmail === usuarioLogado.email);
        
        // Adiciona status 'ativa' a reservas que não possuem status definido
        const reservasAtualizadas = reservasDoTurista.map((reserva) => ({
            ...reserva,
            status: reserva.status || 'ativa',
        }));

        setReservas(reservasAtualizadas);
    }, [usuarioLogado]);

    // Função para cancelar a reserva
    const handleCancelReserva = (reservaId) => {
        const reservasAtualizadas = reservas.map((reserva) =>
            reserva.passeioId === reservaId ? { ...reserva, status: 'cancelada' } : reserva
        );
        setReservas(reservasAtualizadas);

        // Atualiza o localStorage com as reservas atualizadas
        localStorage.setItem('reservas', JSON.stringify(reservasAtualizadas));
        setMensagem('Reserva cancelada com sucesso.');
    };

    if (mensagem) {
        return <p>{mensagem}</p>;
    }

    return (
        <div className="reservas-container">
            <h2>Minhas Reservas</h2>
            {reservas.length > 0 ? (
                <ul className="reservas-list">
                    {reservas.map((reserva, index) => (
                        <li key={index} className="reservas-item">
                            <h4>{reserva.passeioId}</h4>
                            <p><strong>Local:</strong> {reserva.local}</p>
                            <p><strong>Data:</strong> {reserva.data}</p>
                            <p><strong>Status:</strong> {reserva.status}</p>
                            {reserva.status !== 'cancelada' && (
                                <button className="btn btn-danger" onClick={() => handleCancelReserva(reserva.passeioId)}>
                                    Cancelar Reserva
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Você não possui reservas.</p>
            )}
        </div>
    );
};

export default Reservas;
