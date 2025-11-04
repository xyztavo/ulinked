import { BlogProps } from "./types/config.blog"

const blog: BlogProps = {
    title: "Sobre Nós",
    posts: [
        {
            title: "Transformando medo em confiança",
            description: "A Direção Positiva nasceu pra ajudar quem sente insegurança ao dirigir. Nosso método é humanizado e foca em evolução real — sem pressão, sem julgamentos.",
            footer: "Atendemos no Grajaú e região com aulas práticas personalizadas 🚗",
        },
        {
            title: "Planos e valores acessíveis",
            description: "Temos três opções pensadas pra cada fase: o Essencial (R$390 - 3 aulas), o Confiança (R$660 - 6 aulas) e o Transformação (R$1.100 - 10 aulas). Todos com acompanhamento e veículo incluso. Aulas Avulsas de R$150.00 por apenas R$130 direto no nosso site.",
            footer: "Aulas de segunda a domingo, sempre com foco em resultado 💪",
        },
        {
            title: "Cursos online exclusivos",
            description: "Quer aprender sem sair de casa? Temos o curso 'Dirigir Com Tranquilidade' e o 'Guia Prático de Direção' — ambos com mais de 20 aulas passo a passo.",
            footer: `Disponíveis na Eduzz nos links acima 🎥`,
        },
    ],
}

export default blog
