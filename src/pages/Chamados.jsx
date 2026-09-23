import { Link } from "react-router";

function Chamados() {
    return (
        <div className="pagina">
            <h1>Gerenciamento de Chamados</h1>
             <p>Desafio Técnico. Desenvolvido por Henrique Porto de Sousa.</p>
            <p>Escolha uma das opções:</p>
            <div className="opcoes">
                <Link to="/chamados/listar">
                    Listar Chamados
                </Link>
                <Link to="/chamados/cadastrar">
                    Cadastrar novo chamado
                </Link>
            </div>
            
            <Link to="/">
                Voltar para a página inicial
            </Link>

        </div>
    )
}

export default Chamados