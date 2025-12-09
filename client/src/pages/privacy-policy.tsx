import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-4xl font-bold mb-8 text-black">Política de Privacidade</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-black mb-3">1. Introdução</h2>
              <p>
                A Angola Imobiliária respeita a sua privacidade e está empenhada em proteger os seus dados pessoais. 
                Esta política de privacidade irá informá-lo sobre como tratamos os seus dados pessoais quando visita o nosso site 
                e informá-lo sobre os seus direitos de privacidade e como a lei o protege.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">2. Dados que recolhemos</h2>
              <p>
                Podemos recolher, usar, armazenar e transferir diferentes tipos de dados pessoais sobre si, que agrupamos da seguinte forma:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Dados de Identidade:</strong> inclui primeiro nome, apelido, nome de utilizador ou identificador similar.</li>
                <li><strong>Dados de Contacto:</strong> inclui endereço de cobrança, endereço de entrega, endereço de email e números de telefone.</li>
                <li><strong>Dados Técnicos:</strong> inclui endereço de protocolo de internet (IP), dados de login, tipo e versão do navegador, configuração e localização do fuso horário.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">3. Como usamos os seus dados</h2>
              <p>
                Só usaremos os seus dados pessoais quando a lei nos permitir. Na maioria das vezes, usaremos os seus dados pessoais nas seguintes circunstâncias:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Para processar e gerir a sua relação connosco.</li>
                <li>Para melhorar o nosso site, produtos/serviços, marketing e experiências dos clientes.</li>
                <li>Para cumprir uma obrigação legal ou regulamentar.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">4. Segurança dos dados</h2>
              <p>
                Estabelecemos medidas de segurança adequadas para evitar que os seus dados pessoais sejam acidentalmente perdidos, usados ou acedidos de forma não autorizada, alterados ou divulgados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">5. Os seus direitos legais</h2>
              <p>
                Sob certas circunstâncias, tem direitos sob as leis de proteção de dados em relação aos seus dados pessoais, incluindo o direito de solicitar acesso, correção, apagamento, restrição, transferência dos seus dados pessoais ou retirar o consentimento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-3">6. Contacte-nos</h2>
              <p>
                Se tiver alguma dúvida sobre esta política de privacidade ou sobre as nossas práticas de privacidade, por favor contacte-nos através do email geral@angolaimobiliaria.ao ou pelo telefone +244 927 963 478.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
