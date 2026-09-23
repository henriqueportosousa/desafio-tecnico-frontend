import { useState } from "react";
import { Link, useParams } from "react-router";

function EditarChamado({ chamados, aoAlterar }) {
    const { id } = useParams();

    const chamadoEncontrado = chamados.find(
        (chamado) => Number(chamado.id) === Number(id)
    );

    const [titulo, setTitulo] = useState(chamadoEncontrado?.titulo ?? '');
    const [descricao, setDescricao] = useState(chamadoEncontrado?.descricao ?? '');
    const [prioridade, setPrioridade] = useState(String(chamadoEncontrado?.prioridade ?? '1'));
    const [solicitante, setSolicitante] = useState(chamadoEncontrado?.solicitante ?? '');
    const [status, setStatus] = useState(chamadoEncontrado?.status ?? 'ABERTO');
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

    function alterarChamado(evento) {
        evento.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const chamadoAtualizado = {
            id: Number(id),
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            prioridade: Number(prioridade),
            solicitante: solicitante.trim(),
            status: status // Salva como texto diretamente ('ABERTO', 'EM ANDAMENTO', etc.)
        };

        aoAlterar(chamadoAtualizado);
        setMensagemSucesso('Chamado alterado com sucesso!');
    }

    if (!chamadoEncontrado) {
        return (
            <main className="pagina">
                <h1>Chamado não encontrado</h1>
                <Link to="/chamados/listar">Voltar para Lista de Chamados</Link>
            </main>
        );
    }

    return (
        <main className="pagina">
            <h1>Alterar Chamado</h1>

            {mensagemSucesso && (
                <p className="mensagem-sucesso">
                    {mensagemSucesso}
                </p>
            )}

            <form
                className="formulario"
                onSubmit={alterarChamado}
                noValidate
            >
                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    id="titulo"
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
                    <span className="mensagem-erro">{erros.titulo}</span>
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
                    <span className="mensagem-erro">{erros.descricao}</span>
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
                    <span className="mensagem-erro">{erros.status}</span>
                )}

                <label htmlFor="solicitante">Solicitante</label>
                <input
                    type="text"
                    id="solicitante"
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
                    <span className="mensagem-erro">{erros.solicitante}</span>
                )}

                <button type="submit">Alterar Chamado</button>
            </form>

            <Link to="/chamados/listar">
                Voltar para a lista de chamados
            </Link>
        </main>
    );
}

export default EditarChamado;