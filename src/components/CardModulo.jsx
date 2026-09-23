import { Link } from "react-router"

function CardModulo({ titulo, descricao, rota }) {
    const conteudoCard = (
        <article className="card-modulo">
            <h2>{titulo}</h2>
            <p>{descricao}</p>
        </article>
    )
    if (rota) {
        return (
            <Link to={rota} className="link-card">
                {conteudoCard}
            </Link>
        )
    }
    return conteudoCard
}



export default CardModulo