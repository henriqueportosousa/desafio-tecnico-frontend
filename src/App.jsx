import './App.css'

import { useState } from 'react'
import { Routes, Route } from 'react-router';

import Cabecalho from "./components/Cabecalho";
import CardModulo from "./components/CardModulo";

import CadastroChamado from './pages/CadastroChamado';

import chamadosInicias from './data/chamados';


function App() {
  const [mostrarModulos, setMostrarModulos] = useState(true);
  const [chamados, setChamados] = useState(chamadosInicias);

  const [modulos] = useState([
    {
      id: 1,
      titulo: "Gerenciamento de Chamados",
      descricao: "Cadastrar, consulte, excluir, alterar os chamados disponíveis.",
      rota: '/chamados'
    },
  ]);


  function adicionarChamado(novoChamado) {
    const chamadoComId = {
      id: Date.now(),
      ...novoChamado,
    }
    setChamados((listaAtual) => [
      ...listaAtual,
      chamadoComId,
    ]);

    function exluirChamado(id) {
      setChamados((listaAtual) =>
        listaAtual.filter((chamado) => chamado.id !== id)
      );
    }

    function alterarChamado(chamadoAtualizado) {
      setChamados((listaAtual) =>
        listaAtual.map((chamado) =>
          chamado.id === chamadoAtualizado.id
            ? chamadoAtualizado
            : chamado
        )
      );
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="aplicacao">
            <Cabecalho />
            <main className="conteudo-principal">

              <p className="introducao">
                Desafio Tecnico. Desenvolvindo Por Henrique Porto de Sousa
              </p>

              <button
                type="button"
                className="botao-alternar"
                onClick={() => setMostrarModulos(!mostrarModulos)}
              >
                {mostrarModulos ? "Ocultar módulos" : "Exibir módulos"}
              </button>


              {mostrarModulos && (
                <section className="modulos">
                  {modulos.map((modulo) => (
                    <CardModulo
                      key={modulo.id}
                      titulo={modulo.titulo}
                      descricao={modulo.descricao}
                      rota={modulo.rota}
                    />
                  ))}
                </section>
              )}
            </main>
          </div>
        }
      />

      <Route
        path='/chamados'
        element={
          <Chamados />
        }
      />

      <Route
        path='/chamados/listar'
        element={
          <Chamados
            
          />
        }
      />

      <Route
        path='/chamados/cadastrar'
        element={
          <CadastroChamado
            chamados={chamados}
            aoCadastrar={adicionarChamado}
          />
        }
      />

      <Route
        path='/chamados/editar/:id'
        element={
          <Chamados />
        }
      />
    </Routes>
  )
}

export default App
