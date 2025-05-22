import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full pb-3">
      <div className="relative h-24 flex items-center justify-center px-4">
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="https://pub-3a57e53548b04fb79ef081d08940016c.r2.dev/sporting-campeao.png"
            alt="Sporting Campeão"
            className="h-24"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;