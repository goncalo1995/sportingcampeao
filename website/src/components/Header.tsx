
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 pt-5 h-16 flex items-center justify-between">
        {/* <Link to="/" className="font-bold text-xl hover:text-primary transition-colors">
        <img src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/sporting-campeao.png" alt="Sporting Campeão" className="h-60 mr-2" />
        </Link> */}
        
        <nav  >
          <ul className="flex items-center space-x-6 text-xl">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
              <img src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/sporting-campeao.png"
                alt="Sporting Campeão" className="pt-4 h-24 mr-2" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
