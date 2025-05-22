import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="flex items-center text-xl font-bold text-sporting">
            <img src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/sporting-campeao.png" alt="Sporting Campeão" className="h-60 mr-2" />
            {/* Sporting Campeão */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
