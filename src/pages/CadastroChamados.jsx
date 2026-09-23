import { useState } from "react";
import { Link } from "react-router";

function CadastroChamado({ chamados, aoCadastrar }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('1');
    const [solicitante, setSolicitante] = useState('');
    const [status, setStatus] = useState('ABERTO');
    const [erros, setErros] = useState({});
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    function limparErro(campo) {
        setErros((errosAtuais) => ({
            ...errosAtuais,
            [campo]: '',
        }));
    }

    function validarFormulario() {
        const novosErros = {};
        const tituloTratado = titulo.trim();
        const descricaoTratada = descricao.trim();
        const solicitanteTratado = solicitante.trim();

        if (tituloTratado.length < 5) {
            novosErros.titulo = 'O título deve possuir no mínimo 5 caracteres.';
        }

        if (descricaoTratada.length < 10) {
            novosErros.descricao = 'A descrição deve possuir no mínimo 10 caracteres.';
        }

        if (!solicitanteTratado) {
            novosErros.solicitante = 'Informe o nome do solicitante.';
        } else if (/\d/.test(solicitanteTratado)) {
            novosErros.solicitante = 'O nome do solicitante não pode conter números.';
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    function cadastrarChamado(evento) {
        evento.preventDefault();

        setMensagemSucesso('');

        if (!validarFormulario()) {
            return;
        }

        const novoChamado = {
            id: chamados && chamados.length > 0 ? chamados[chamados.length - 1].id + 1 : 1,
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            prioridade: Number(prioridade),
            solicitante: solicitante.trim(),
            status: status // Salva o texto direto do status
        };

        aoCadastrar(novoChamado);

        setMensagemSucesso('Chamado cadastrado com sucesso!');

        setErros({});
        setTitulo('');
        setDescricao('');
        setPrioridade('1');
        setStatus('ABERTO');
        setSolicitante('');
    }

    return (
        <main className="pagina">
            <h1>Cadastrar novo chamado</h1>
<span style={{fontWeight: "bold", color: "black"}}>Desafio Tecnico. Desenvolvindo por Henrique Porto de Sousa</span>

            {mensagemSucesso && (
                <p className="mensagem-sucesso">
                    {mensagemSucesso}
                </p>
            )}

            <form
                className="formulario"
                onSubmit={cadastrarChamado}
                noValidate
            >
                <label htmlFor="titulo">Título</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(evento) => {
                        setTitulo(evento.target.value);
                        limparErro('titulo');
                    }}
                    className={erros.titulo ? 'campo-invalido' : ''}
                    placeholder="Digite o título do chamado"
                    required
                />

                {erros.titulo && (
                    <span className="mensagem-erro">
                        {erros.titulo}
                    </span>
                )}

                <label htmlFor="descricao">Descrição</label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(evento) => {
                        setDescricao(evento.target.value);
                        limparErro('descricao');
                    }}
                    className={erros.descricao ? 'campo-invalido' : ''}
                    placeholder="Descreva o problema com detalhes..."
                    rows={4}
                    required
                />

                {erros.descricao && (
                    <span className="mensagem-erro">
                        {erros.descricao}
                    </span>
                )}

                <label htmlFor="prioridade">Prioridade</label>
                <select
                    id="prioridade"
                    value={prioridade}
                    onChange={(evento) => {
                        setPrioridade(evento.target.value);
                        limparErro('prioridade');
                    }}
                >
                    <option value="1">Baixa</option>
                    <option value="2">Média</option>
                    <option value="3">Alta</option>
                </select>

                <label htmlFor="solicitante">Solicitante</label>
                <input
                    id="solicitante"
                    type="text"
                    value={solicitante}
                    onChange={(evento) => {
                        const valorSemNumeros = evento.target.value.replace(/[0-9]/g, '');
                        setSolicitante(valorSemNumeros);
                        limparErro('solicitante');
                    }}
                    className={erros.solicitante ? 'campo-invalido' : ''}
                    placeholder="Digite o nome do solicitante"
                    required
                />

                {erros.solicitante && (
                    <span className="mensagem-erro">
                        {erros.solicitante}
                    </span>
                )}

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={status}
                    onChange={(evento) => {
                        setStatus(evento.target.value);
                        limparErro('status');
                    }}
                >
                    <option value="ABERTO">ABERTO</option>
                    <option value="EM ANDAMENTO">EM ANDAMENTO</option>
                    <option value="CONCLUÍDO">CONCLUÍDO</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>

                {erros.status && (
                    <span className="mensagem-erro">
                        {erros.status}
                    </span>
                )}

                <button type="submit">Cadastrar chamado</button>
            </form>

            <Link to="/chamados">Voltar para Gerenciamento de Chamados</Link>
        </main>
    );
}

export default CadastroChamado;