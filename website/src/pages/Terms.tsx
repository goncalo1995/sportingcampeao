
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 bg-sporting text-white">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Termos e Condições</h1>
            <p className="text-xl text-center max-w-2xl mx-auto">
              Informações legais sobre a utilização do nosso site e participação na campanha
            </p>
          </div>
        </section>
        
        {/* Terms Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg">
              <h2>1. Termos Gerais</h2>
              <p>
                Ao acessar o site Sporting Campeão, concorda em cumprir estes termos de serviço, todas as leis e 
                regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. 
                Se não concordar com algum destes termos, está proibido de usar ou acessar este site.
              </p>
              
              <h2>2. Campanha "Lugar de Leão"</h2>
              <h3>2.1 Objetivo da Campanha</h3>
              <p>
                A campanha "Lugar de Leão" visa angariar fundos para a aquisição de lugares no Estádio José Alvalade, 
                destinados à iniciativa "Sporting Campeão". O objetivo primário é adquirir um lugar para uso do organizador 
                da campanha, e lugares adicionais para sorteio entre os doadores.
              </p>
              
              <h3>2.2 Elegibilidade para o Sorteio</h3>
              <p>
                Para ser elegível para o sorteio de lugares adicionais, o participante deve:
              </p>
              <ul>
                <li>Ter feito uma doação para a campanha "Lugar de Leão"</li>
                <li>Ser sócio do Sporting Clube de Portugal com número de sócio válido</li>
                <li>Cumprir todos os requisitos do regulamento do sorteio</li>
              </ul>
              <p>
                Participantes que não são sócios do Sporting CP podem participar na campanha, mas não serão 
                elegíveis para receber um lugar caso sejam sorteados, a menos que se tornem sócios até à data do sorteio.
              </p>
              
              <h3>2.3 Doações</h3>
              <p>
                Todas as doações são finais e não reembolsáveis. Cada doação confere ao doador entradas para o sorteio 
                de acordo com o valor doado, conforme especificado na página de doação.
              </p>
              
              <h3>2.4 Realização do Sorteio</h3>
              <p>
                O sorteio só será realizado se os fundos angariados forem suficientes para adquirir pelo menos dois lugares 
                (o lugar do organizador e um lugar adicional para sorteio). O sorteio será realizado de forma transparente, 
                utilizando um método eletrônico de seleção aleatória, com a data e hora anunciadas com pelo menos 7 dias de antecedência.
              </p>
              
              <h2>3. Venda de Produtos</h2>
              <p>
                Os produtos vendidos através deste site são oferecidos "como estão" e sem garantias de qualquer tipo, 
                expressas ou implícitas. Não garantimos que os produtos cumpram seus requisitos ou que o uso deles seja 
                ininterrupto, oportuno, seguro ou isento de erros.
              </p>
              
              <h3>3.1 Envio e Entregas</h3>
              <p>
                Os produtos físicos serão enviados após confirmação do pagamento. Os prazos de entrega são aproximados e 
                podem variar de acordo com a localização do destinatário. Não nos responsabilizamos por atrasos causados 
                pelos serviços de entrega ou por circunstâncias além de nosso controle.
              </p>
              
              <h3>3.2 Política de Devolução</h3>
              <p>
                O cliente tem 14 dias após o recebimento do produto para solicitar a devolução. O produto deve estar em sua 
                embalagem original, não utilizado e em perfeitas condições. Os custos de devolução são de responsabilidade do cliente.
              </p>
              
              <h2>4. Privacidade e Proteção de Dados</h2>
              <p>
                Os dados pessoais recolhidos são usados exclusivamente para processamento de doações, vendas, envio de 
                produtos e comunicação sobre a campanha "Lugar de Leão". Não compartilhamos seus dados com terceiros 
                sem seu consentimento expresso, exceto quando exigido por lei. Para mais informações, consulte nossa 
                Política de Privacidade.
              </p>
              
              <h2>5. Livro de Reclamações</h2>
              <p>
                Em conformidade com a legislação portuguesa, disponibilizamos o acesso ao Livro de Reclamações Eletrônico:
              </p>
              <div className="mt-4 mb-8">
                <a 
                  href="https://www.livroreclamacoes.pt/inicio" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-yellow-500 text-black px-4 py-2 rounded font-bold inline-flex items-center"
                >
                  Livro de Reclamações
                </a>
              </div>
              
              <h2>6. Alterações aos Termos de Serviço</h2>
              <p>
                Reservamo-nos o direito de atualizar estes termos de serviço a qualquer momento. As alterações entram em 
                vigor imediatamente após serem publicadas nesta página.
              </p>
              
              <h2>7. Contato</h2>
              <p>
                Para qualquer questão relacionada com estes termos, entre em contato através do email: 
                <a href="mailto:info@sportingcampeao.pt" className="text-sporting ml-1">info@sportingcampeao.pt</a>
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Última atualização: 18 de maio de 2025
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
