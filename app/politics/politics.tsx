"use client";


export default function PrivacyPage() {
  const [copied, setCopied] = useState(false);

  function handleCopyUrl(): void {
    try {
      const url = window.location.href;
      void navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // fallback
      setCopied(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 text-gray-900">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-md">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Política de Privacidade</h1>
            <p className="mt-1 text-sm text-gray-600">Última atualização: 10 de novembro de 2025</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopyUrl}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
              aria-label="Copiar URL da página"
            >
              {copied ? "URL copiada" : "Copiar URL"}
            </button>
          </div>
        </header>

        <article className="prose max-w-none prose-a:text-blue-600">
          <h2>1. Introdução</h2>
          <p>
            Esta política descreve como coletamos, usamos e protegemos os dados pessoais que você fornece ao
            preencher formulários neste site ou em anúncios.
          </p>

          <h2>2. Controlador de Dados</h2>
          <p>
            Responsável pelo tratamento: <strong>ustav</strong>
            <br /> Contato: <a href="mailto:seu@email">gustavobreasy@gmail.com</a>
          </p>

          <h2>3. Que dados coletamos</h2>
          <ul>
            <li>Nome</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>Dados opcionais que você preencher (mensagem, cidade, etc.)</li>
          </ul>

          <h2>4. Finalidade do tratamento</h2>
          <p>
            Usamos os dados para entrar em contato, qualificar leads e oferecer nossos serviços. Podemos usar dados
            para análises internas e melhoria de campanhas.
          </p>

          <h2>5. Direitos</h2>
          <p>
            Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados, e retirar o consentimento a
            qualquer momento pelo e-mail indicado acima.
          </p>

          <hr />
        </article>
      </div>
    </div>
  );
}
function useRef<T>(arg0: null) {
    throw new Error("Function not implemented.");
}

function useState(arg0: boolean): [any, any] {
    throw new Error("Function not implemented.");
}

