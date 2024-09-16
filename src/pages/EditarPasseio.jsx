import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarPasseio.css'; 

const EditarPasseio = () => {
    const { id } = useParams(); // Obtém o ID do passeio da URL
    const navigate = useNavigate();
    const [passeio, setPasseio] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        // Carrega os passeios do localStorage
        const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
        const passeioEncontrado = passeiosCadastrados.find((p) => p.nomePasseio === id);
    
        if (passeioEncontrado) {
          setPasseio(passeioEncontrado);
        } else {
          setMensagem('Passeio não encontrado.');
        }
      }, [id]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasseio({ ...passeio, [name]: value });
      };
    
      const handleSave = () => {
        const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];

         // Atualiza o passeio no array
    const novosPasseios = passeiosCadastrados.map((p) => 
        p.nomePasseio === id ? passeio : p
      );

       // Atualiza o localStorage com os passeios atualizados
    localStorage.setItem('passeios', JSON.stringify(novosPasseios));
    setMensagem('Passeio atualizado com sucesso!');
    navigate('/dashboard-guia');
  };

  if (!passeio) {
    return <p>{mensagem || 'Carregando...'}</p>;
  }

  return (
    <div className="editar-passeio-container">
      <h2>Editar Passeio: {passeio.nomePasseio}</h2>
      <form>
        <div>
          <label>Nome do Passeio:</label>
          <input
            type="text"
            name="nomePasseio"
            value={passeio.nomePasseio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Local:</label>
          <input
            type="text"
            name="local"
            value={passeio.local}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={passeio.descricao}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={passeio.preco}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={passeio.data}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Salvar
        </button>
      </form>

      {mensagem && <p className="text-success">{mensagem}</p>}
    </div>
  );
};

export default EditarPasseio;