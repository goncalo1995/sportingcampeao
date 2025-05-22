import Header from '@/components/Header';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react'; // ChevronDown, ChevronUp added if Collapsible is in this file
import { useState, ReactNode } from 'react'; // useState, ReactNode added if Collapsible is in this file

const APP_NAME = 'sportingcampeao.pt'; // Updated App Name
const CONTACT_EMAIL = 'info@sportingcampeao.com'; // Updated Contact Email
const WEBSITE_THEME = 'a fun video project showcasing being hit by a ball, supported by viewer donations';

// If CollapsibleSection is in this file, paste its code here. Otherwise, import it.
// For example: import CollapsibleSection from '@/components/CollapsibleSection';

// Start: CollapsibleSection component (if not imported)
interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  initiallyOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="mb-6 border border-border rounded-lg overflow-hidden shadow-sm bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
        aria-expanded={isOpen}
        aria-controls={`section-${title.replace(/\s+/g, '-')}`}
      >
        <h3 className="text-xl font-semibold text-foreground text-left">{title}</h3> {/* Changed to h3 for semantics within page h1 */}
        {isOpen ? <ChevronUp className="h-6 w-6 text-primary" /> : <ChevronDown className="h-6 w-6 text-muted-foreground" />}
      </button>
      {isOpen && (
        <div
          id={`section-${title.replace(/\s+/g, '-')}`}
          className="p-4 md:p-6 border-t border-border prose prose-base md:prose-lg dark:prose-invert max-w-none" // Adjusted prose size
        >
          {children}
        </div>
      )}
    </div>
  );
};
// End: CollapsibleSection component


export const metadata = {
  title: `Política de Privacidade - ${APP_NAME}`,
  description: `Consulte a política de privacidade do site ${APP_NAME}.`,
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Política de Privacidade</h1>
            <p className="mt-4 text-xl text-foreground/80">Última atualização: {currentDate}</p>
          </div>

          {/* Removed the outer prose div, as CollapsibleSection handles its own content styling */}
          <CollapsibleSection title="Introdução" initiallyOpen={true}>
            <p>Bem-vindo(a) ao {APP_NAME} (doravante "Site", "nós", "nosso"). A sua privacidade é muito importante para nós. Esta Política de Privacidade explica como recolhemos, usamos, partilhamos e protegemos os seus dados pessoais quando visita o nosso Site, que apresenta {WEBSITE_THEME}, e interage com as nossas funcionalidades, incluindo a possibilidade de fazer doações via PayPal ou Revolut.</p>
            <p>Comprometemo-nos a proteger os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento (UE) 2016/679) e a legislação de proteção de dados aplicável em Portugal.</p>
          </CollapsibleSection>

          <CollapsibleSection title="1. Responsável pelo Tratamento dos Dados">
            <p>O responsável pelo tratamento dos seus dados pessoais é:</p>
            <p>
              <strong>Nome do Projeto:</strong> {APP_NAME}
              <br />
              <strong>Email de contacto para questões de privacidade:</strong> <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="2. Que Dados Pessoais Recolhemos?">
            <p>Podemos recolher e processar os seguintes tipos de dados pessoais:</p>
            <ul>
              <li><strong>Dados de Doação:</strong> Quando faz uma doação através de PayPal ou Revolut, somos redirecionados para as respetivas plataformas. Não armazenamos os detalhes completos do seu cartão de crédito/débito ou conta bancária. As informações que podemos receber dessas plataformas podem incluir o seu nome (conforme registado na plataforma de pagamento), endereço de email, o montante da doação e um identificador de transação. O NIF (Número de Identificação Fiscal) apenas será solicitado se pretender um recibo para efeitos fiscais e se o nosso sistema o permitir.</li>
              <li><strong>Dados de Interação (opcional):</strong> Se optar por interagir com funcionalidades como "dar um café virtual" ou valores simbólicos antes de doar, podemos registar essas interações para melhorar a experiência do utilizador, mas estes dados são geralmente anónimos ou agregados, a menos que associados a uma doação subsequente.</li>
              <li><strong>Dados Técnicos (automáticos):</strong> Endereço IP, tipo de navegador, sistema operativo, informações sobre a sua visita (páginas visitadas, tempo de permanência), recolhidos através de cookies ou tecnologias semelhantes (consulte a nossa secção sobre Cookies).</li>
              <li><strong>Comunicações:</strong> Qualquer comunicação que nos envie, incluindo emails ou mensagens através de formulários de contacto, caso existam.</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="3. Como e Porquê Utilizamos os Seus Dados Pessoais">
            <p>Utilizamos os seus dados pessoais para as seguintes finalidades e com os seguintes fundamentos jurídicos:</p>
            <ul>
              <li><strong>Processar as suas doações:</strong> Para registar a sua contribuição e, se solicitado e possível, emitir confirmações ou recibos. (Fundamento: Execução de um contrato ou interesse legítimo em gerir as contribuições).</li>
              <li><strong>Melhorar o nosso Site e a experiência do utilizador:</strong> Através da análise de dados técnicos e de interação para garantir a funcionalidade, segurança e otimizar o conteúdo e as funcionalidades de doação. (Fundamento: Interesse Legítimo).</li>
              <li><strong>Comunicar consigo:</strong> Para responder a questões ou fornecer informações importantes sobre o Site ou as suas doações, caso nos contacte. (Fundamento: Interesse Legítimo).</li>
              <li><strong>Cumprir obrigações legais e regulatórias:</strong> Como obrigações fiscais ou de reporte, se aplicável. (Fundamento: Cumprimento de obrigações legais).</li>
            </ul>
          </CollapsibleSection>

          <CollapsibleSection title="4. Com Quem Partilhamos os Seus Dados Pessoais?">
            <p>Não vendemos os seus dados pessoais. Podemos partilhar os seus dados pessoais com:</p>
            <ul>
              <li><strong>Prestadores de Serviços de Pagamento (PayPal, Revolut):</strong> Quando opta por fazer uma doação, será redirecionado para o PayPal ou Revolut. O processamento do seu pagamento é gerido por eles, de acordo com as suas próprias políticas de privacidade. Apenas recebemos informações de confirmação da transação.</li>
              <li><strong>Prestadores de Serviços Tecnológicos:</strong> Que nos auxiliam na gestão do site, alojamento e análise de dados. Estes prestadores estão contratualmente obrigados a proteger os seus dados.</li>
              <li><strong>Autoridades Legais ou Regulatórias:</strong> Quando exigido por lei ou para proteger os nossos direitos legais.</li>
            </ul>
            <p>Garantimos que todos os terceiros com quem partilhamos dados pessoais (quando aplicável) estão obrigados a respeitar a segurança dos seus dados e a tratá-los de acordo com a lei.</p>
          </CollapsibleSection>

          <CollapsibleSection title="5. Transferências Internacionais de Dados">
            <p>O PayPal e o Revolut, bem como alguns dos nossos prestadores de serviços tecnológicos, podem operar globalmente, o que pode implicar a transferência dos seus dados para fora do Espaço Económico Europeu (EEE). Nesses casos, essas transferências são realizadas de acordo com as políticas de privacidade desses prestadores e em conformidade com as leis de proteção de dados aplicáveis, utilizando mecanismos como Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia ou outras garantias adequadas.</p>
          </CollapsibleSection>

          <CollapsibleSection title="6. Por Quanto Tempo Conservamos os Seus Dados Pessoais?">
            <p>Conservaremos os seus dados pessoais apenas durante o tempo necessário para cumprir as finalidades para as quais foram recolhidos:</p>
            <ul>
              <li><strong>Dados de Doação (informações de confirmação):</strong> Pelo período legalmente exigido para fins fiscais e contabilísticos (em Portugal, geralmente 10 anos), mesmo que a doação seja simbólica.</li>
              <li><strong>Dados Técnicos e de Interação Agregados:</strong> Podem ser conservados por períodos mais longos para análise de tendências, mas de forma anonimizada ou agregada.</li>
              <li><strong>Comunicações:</strong> Pelo tempo necessário para resolver a sua questão e para fins de registo, se aplicável.</li>
            </ul>
            <p>Após estes períodos, os dados serão eliminados ou anonimizados de forma segura.</p>
          </CollapsibleSection>

          <CollapsibleSection title="7. Os Seus Direitos de Proteção de Dados">
            <p>Nos termos do RGPD, tem os seguintes direitos relativamente aos seus dados pessoais:</p>
            <ul>
              <li><strong>Direito de Acesso:</strong> Solicitar uma cópia dos dados pessoais que temos sobre si.</li>
              <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados pessoais incorretos ou incompletos.</li>
              <li><strong>Direito ao Apagamento ("Direito a ser Esquecido"):</strong> Solicitar o apagamento dos seus dados pessoais, em certas circunstâncias.</li>
              <li><strong>Direito à Limitação do Tratamento:</strong> Solicitar a restrição do processamento dos seus dados pessoais, em certas circunstâncias.</li>
              <li><strong>Direito de Portabilidade dos Dados:</strong> Em certas condições, solicitar a transferência dos seus dados.</li>
              <li><strong>Direito de Oposição:</strong> Opor-se ao tratamento dos seus dados pessoais quando baseado no nosso interesse legítimo.</li>
              <li><strong>Direito de Retirar o Consentimento:</strong> Se o tratamento se basear no consentimento (ex: para cookies não essenciais), pode retirá-lo a qualquer momento.</li>
            </ul>
            <p>Para exercer qualquer um destes direitos, por favor contacte-nos através do email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.</p>
            <p>Poderemos solicitar informações para confirmar a sua identidade. Tem também o direito de apresentar uma reclamação junto da Comissão Nacional de Proteção de Dados (CNPD) - <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnpd.pt</a>.</p>
          </CollapsibleSection>

          <CollapsibleSection title="8. Segurança dos Seus Dados Pessoais">
            <p>Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrónico é 100% seguro. Ao ser redirecionado para o PayPal ou Revolut, a segurança da transação é gerida por essas plataformas.</p>
          </CollapsibleSection>

          <CollapsibleSection title="9. Cookies">
            <p>O nosso Site pode utilizar cookies essenciais para o seu funcionamento (ex: para manter a sessão, preferências). Poderemos também utilizar cookies de análise (com o seu consentimento prévio, quando aplicável) para entender como os visitantes interagem com o site de forma anónima, ajudando-nos a melhorar os nossos serviços. Pode configurar o seu navegador para bloquear ou alertá-lo sobre estes cookies, mas algumas partes do site poderão não funcionar corretamente. Para uma gestão detalhada, poderá ser implementado um banner de consentimento de cookies.</p>
          </CollapsibleSection>

          <CollapsibleSection title="10. Privacidade de Menores">
            <p>O nosso Site destina-se a um público geral e não recolhemos intencionalmente dados pessoais de menores de 16 anos (ou outra idade mínima aplicável para consentimento digital) sem o consentimento dos titulares das responsabilidades parentais. Se tivermos conhecimento de que recolhemos dados pessoais de um menor sem o devido consentimento, tomaremos medidas para eliminar essas informações.</p>
          </CollapsibleSection>

          <CollapsibleSection title="11. Alterações a Esta Política de Privacidade">
            <p>Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com uma data de "Última atualização" revista. Encorajamo-lo a rever esta Política de Privacidade regularmente.</p>
          </CollapsibleSection>

          <CollapsibleSection title="12. Contactos">
            <p>Se tiver alguma questão sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais, por favor contacte-nos através de:</p>
            <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
          </CollapsibleSection>
        </div>
      </div>
    </>
  );
}