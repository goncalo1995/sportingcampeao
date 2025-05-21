
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sporting text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sporting Campeão</h3>
            <p className="text-sporting-foreground/90">
              A campanha para ajudar a conseguir o meu lugar de Leão no Estádio José Alvalade
               {/* e também oferecer lugares a sortear entre os apoiantes. */}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sporting-foreground/90 hover:text-sporting-foreground transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sporting-foreground/90 hover:text-sporting-foreground transition-colors">
                  Doar
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sporting-foreground/90 hover:text-sporting-foreground transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sporting-foreground hover:text-sporting-foreground/80 transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sporting-foreground hover:text-sporting-foreground/80 transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sporting-foreground hover:text-sporting-foreground/80 transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sporting-foreground hover:text-sporting-foreground/80 transition-colors">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-sporting-foreground/20 my-8" />
        
        <div className="text-center text-sporting-foreground/80">
          <p>&copy; {new Date().getFullYear()} Sporting Campeão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
