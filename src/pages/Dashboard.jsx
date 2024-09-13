import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h1>Bem-vindo ao Dashboard!</h1>
      <p>Parabéns, você fez login com sucesso.</p>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Painel de Controle</h5>
          <p className="card-text">Aqui você pode gerenciar suas atividades e ver informações importantes.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;