import Link from "next/link";

export default function Metas(){
  return (
    <>
        <h1>Bem-vindo ao Meu Painel!</h1>
      <p>Escolha uma das opções abaixo para começar:</p>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "1rem 0" }}>
            <Link href="/dashboard" style={{ fontSize: "1.2rem", color: "#0070f3" }}>
              Ir para o Dashboard
            </Link>
          </li>
          <li style={{ margin: "1rem 0" }}>
            <Link href="/links" style={{ fontSize: "1.2rem", color: "#0070f3" }}>
              Gerenciar Links
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}