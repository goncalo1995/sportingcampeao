import Header from '@/components/Header';
import { ShieldCheck } from 'lucide-react';

const APP_NAME = 'Sporting Campeão';
const CONTACT_EMAIL = 'info@sportingcampeao.com';

export const metadata = {
  title: `Política de Privacidade - ${APP_NAME}`,
  description: `Consulte a política de privacidade da campanha ${APP_NAME}.`,
};

export default function PrivacyPolicyPage() {
  return (
<>    <Header />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Política de Privacidade</h1>
          <p className="mt-4 text-xl text-foreground/80">Última atualização: {new Date().toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto bg-card p-6 md:p-8 rounded-xl shadow-lg">
          <p>Bem-vindo ao {APP_NAME} (doravante "Site", "nós", "nosso"). A sua privacidade é fundamental para nós. Esta Política de Privacidade explica como recolhemos, usamos, partilhamos e protegemos os seus dados pessoais quando visita o nosso Site, faz uma doação ou se inscreve para participar nos nossos sorteios.</p>
          <p>Comprometemo-nos a proteger os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento (UE) 2016/679) e a Lei de Proteção de Dados Pessoais portuguesa (Lei n.º 58/2019).</p>

          <h2>1. Responsável pelo Tratamento dos Dados</h2>
          <p>O responsável pelo tratamento dos seus dados pessoais é:</p>
          <p>
            <strong>Nome do Projeto/Entidade:</strong> {APP_NAME}
            <br />
            <strong>Email de contacto para questões de privacidade:</strong> <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
          </p>

          <h2>2. Que Dados Pessoais Recolhemos?</h2>
          <p>Podemos recolher e processar os seguintes tipos de dados pessoais:</p>
          <ul>
            <li><strong>Dados de Identificação e Contacto:</strong> Nome, endereço de email, número de telefone (opcional, para contacto em caso de sorteio).</li>
            <li><strong>Dados de Doação:</strong> Montante da doação, informações de pagamento (processadas através de prestadores de serviços de pagamento seguros; não armazenamos detalhes completos do seu cartão de crédito/débito – atualmente simulado), NIF (Número de Identificação Fiscal, se fornecer para efeitos de recibo, caso aplicável e quando o sistema de donativos o permitir).</li>
            <li><strong>Dados de Inscrição em Sorteios:</strong> Nome, email, e qualquer outra informação solicitada especificamente para a participação no sorteio (ex: número de sócio do Sporting Clube de Portugal, se relevante para o sorteio e claramente indicado).</li>
            <li><strong>Dados Técnicos (automáticos):</strong> Endereço IP, tipo de navegador, sistema operativo, informações sobre a sua visita (páginas visitadas, tempo de permanência), recolhidos através de cookies ou tecnologias semelhantes (consulte a nossa secção sobre Cookies).</li>
            <li><strong>Comunicações:</strong> Qualquer comunicação que nos envie, incluindo emails ou mensagens através de formulários de contacto.</li>
          </ul>

          <h2>3. Como e Porquê Utilizamos os Seus Dados Pessoais (Finalidades e Fundamento Jurídico)</h2>
          <p>Utilizamos os seus dados pessoais para as seguintes finalidades e com os seguintes fundamentos jurídicos:</p>
          <ul>
            <li><strong>Processar as suas doações:</strong> Para gerir a sua contribuição e emitir confirmações. (Fundamento: Execução de um contrato).</li>
            <li><strong>Gerir a sua inscrição e participação em sorteios:</strong> Incluindo contactar vencedores e entregar prémios de lugares extra, caso existam. (Fundamento: Consentimento ou Execução de um contrato, conforme os termos e condições do sorteio).</li>
            <li><strong>Comunicar consigo:</strong> Responder a questões, enviar informações sobre o site, doações, sorteios, ou outras notícias relevantes, caso tenha consentido. (Fundamento: Consentimento para marketing/newsletters ou Interesse Legítimo para comunicações essenciais sobre transações/serviços).</li>
            <li><strong>Melhorar o nosso Site e serviços:</strong> Através da análise de dados técnicos para garantir a funcionalidade e segurança. (Fundamento: Interesse Legítimo).</li>
            <li><strong>Cumprir obrigações legais e regulatórias.</strong> (Fundamento: Cumprimento de obrigações legais).</li>
          </ul>

          <h2>4. Com Quem Partilhamos os Seus Dados Pessoais?</h2>
          <p>Não vendemos os seus dados pessoais. Podemos partilhar os seus dados pessoais com:</p>
          <ul>
            <li><strong>Prestadores de Serviços de Pagamento:</strong> Para processar as suas doações (ex: PayPal, Stripe, SIBS). Estes prestadores têm as suas próprias políticas de privacidade. (Atualmente, para fins de demonstração do site, o sistema de pagamento é simulado e não há partilha real de dados de pagamento com gateways externos para esta simulação).</li>
            <li><strong>Prestadores de Serviços Tecnológicos:</strong> Que nos auxiliam na gestão do site, alojamento, análise de dados, envio de emails (ex: para confirmação de doação e notificações de sorteios).</li>
            <li><strong>Autoridades Legais ou Regulatórias:</strong> Quando exigido por lei ou para proteger os nossos direitos legais.</li>
            <li><strong>Sporting Clube de Portugal (Potencialmente e com transparência):</strong> Apenas se for estritamente necessário para a validação de elegibilidade para sorteios específicos de lugares ou entrega de prémios, e apenas com o seu consentimento explícito para esta partilha específica, ou se tal estiver claramente definido nos termos e condições do sorteio.</li>
          </ul>
          <p>Garantimos que todos os terceiros com quem partilhamos dados pessoais (quando aplicável) estão obrigados a respeitar a segurança dos seus dados e a tratá-los de acordo com a lei.</p>

          <h2>5. Transferências Internacionais de Dados</h2>
          <p>Alguns dos nossos prestadores de serviços podem estar localizados fora do Espaço Económico Europeu (EEE). Nesses casos, garantiremos que a transferência dos seus dados pessoais é realizada em conformidade com as leis de proteção de dados aplicáveis, nomeadamente através da adoção de Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia ou outras garantias adequadas.</p>

          <h2>6. Por Quanto Tempo Conservamos os Seus Dados Pessoais?</h2>
          <p>Conservaremos os seus dados pessoais apenas durante o tempo necessário para cumprir as finalidades para as quais foram recolhidos, incluindo o cumprimento de requisitos legais, contabilísticos ou de reporte.</p>
          <ul>
            <li><strong>Dados de Doação:</strong> Pelo período legalmente exigido para fins fiscais e contabilísticos (geralmente 10 anos em Portugal, mesmo que a doação seja simbólica nesta fase de demonstração).</li>
            <li><strong>Dados de Inscrição em Sorteios:</strong> Até à conclusão do sorteio, entrega do prémio e expiração de quaisquer prazos para reclamações. Após este período, os dados poderão ser anonimizados ou eliminados.</li>
            <li><strong>Dados para Comunicações (Newsletters):</strong> Até que retire o seu consentimento.</li>
            <li><strong>Outros Dados:</strong> Pelo tempo estritamente necessário para a finalidade em causa.</li>
          </ul>

          <h2>7. Os Seus Direitos de Proteção de Dados</h2>
          <p>Nos termos do RGPD, tem os seguintes direitos relativamente aos seus dados pessoais:</p>
          <ul>
            <li><strong>Direito de Acesso:</strong> Solicitar uma cópia dos dados pessoais que temos sobre si.</li>
            <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados pessoais incorretos ou incompletos.</li>
            <li><strong>Direito ao Apagamento ("Direito a ser Esquecido"):</strong> Solicitar o apagamento dos seus dados pessoais, em certas circunstâncias.</li>
            <li><strong>Direito à Limitação do Tratamento:</strong> Solicitar a restrição do processamento dos seus dados pessoais, em certas circunstâncias.</li>
            <li><strong>Direito de Portabilidade dos Dados:</strong> Solicitar a transferência dos seus dados pessoais para si ou para outro responsável pelo tratamento, num formato estruturado, de uso corrente e de leitura automática, quando o tratamento se basear no consentimento ou num contrato e for realizado por meios automatizados.</li>
            <li><strong>Direito de Oposição:</strong> Opor-se ao tratamento dos seus dados pessoais, em certas circunstâncias (ex: marketing direto).</li>
            <li><strong>Direito de Retirar o Consentimento:</strong> Se o tratamento dos seus dados se basear no seu consentimento, tem o direito de o retirar a qualquer momento, sem comprometer a licitude do tratamento efetuado com base no consentimento previamente dado.</li>
            <li><strong>Direito a não ficar sujeito a decisões individuais automatizadas.</strong></li>
          </ul>
          <p>Para exercer qualquer um destes direitos, por favor contacte-nos através do email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
          <p>Poderemos solicitar informações específicas para nos ajudar a confirmar a sua identidade antes de processar o seu pedido.</p>
          <p>Tem também o direito de apresentar uma reclamação junto da autoridade de controlo competente, a Comissão Nacional de Proteção de Dados (CNPD) - <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnpd.pt</a>.</p>

          <h2>8. Segurança dos Seus Dados Pessoais</h2>
          <p>Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação, perda ou destruição acidental ou ilícita. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrónico é 100% seguro.</p>

          <h2>9. Cookies</h2>
          <p>O nosso Site pode utilizar cookies essenciais para o seu funcionamento. Poderemos também utilizar cookies de análise (com o seu consentimento prévio, quando aplicável) para entender como os visitantes interagem com o site de forma anónima, para nos ajudar a melhorar os nossos serviços. Pode configurar o seu navegador para bloquear ou alertá-lo sobre estes cookies, mas algumas partes do site poderão não funcionar corretamente. Para uma gestão detalhada de cookies, poderá ser implementado um banner de consentimento de cookies.</p>

          <h2>10. Privacidade de Menores</h2>
          <p>O nosso Site não se destina a menores de 16 anos (ou outra idade mínima aplicável em Portugal para consentimento digital) sem o consentimento dos titulares das responsabilidades parentais. Não recolhemos intencionalmente dados pessoais de menores. Se tivermos conhecimento de que recolhemos dados pessoais de um menor sem o devido consentimento, tomaremos medidas para eliminar essas informações.</p>

          <h2>11. Alterações a Esta Política de Privacidade</h2>
          <p>Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com uma data de "Última atualização" revista. Encorajamo-lo a rever esta Política de Privacidade regularmente para se manter informado sobre como protegemos os seus dados.</p>

          <h2>12. Contactos</h2>
          <p>Se tiver alguma questão sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, por favor contacte-nos através de:</p>
          <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
          <p>Ou através do formulário de contacto disponível no nosso Site (se aplicável).</p>
        </div>
      </div>
    </div></>
  );
}