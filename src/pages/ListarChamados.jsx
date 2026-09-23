import { Link } from "react-router";

function ListarChamado({ chamados, aoExcluir }) {

    function confirmarExclusao(chamado) {
        const confirmacao = window.confirm(
            `Deseja realmente excluir o chamado ${chamado.titulo}?`
        )

        if (confirmacao) {
            aoExcluir(chamado.id);
        }
    }

    return (
        <main className="pagina">
            <h1>Lista de chamados</h1>
            <span style={{ fontWeight: "bold", color: "black" }}>Desafio Tecnico. Desenvolvindo por Henrique Porto de Sousa</span>
            <ul className="lista">
                {chamados.map((chamado) => (
                    <li key={chamado.id}>
                        <strong>Titulo: {chamado.titulo}</strong>
                        <span>ID: {chamado.id}</span>
                        <span>Desricao: {chamado.descricao}</span>
                        <span>Priopriedade: {chamado.prioridade}</span>
                        <span>Solicitante: {chamado.solicitante}</span>
                        <span>Status: {chamado.status}</span>

                        <div className="acoes">
                            <Link to={`/chamados/editar/${chamado.id}`} className="botao-alterar">Alterar</Link>
                            <button onClick={() => confirmarExclusao(chamado)} className="botao-excluir">Excluir</button>
                        </div>

                    </li>
                ))}
            </ul>

            <Link to="/chamados">Voltar para Gerenciamento de
                chamados</Link>
        </main>
    )


}

export default ListarChamado;