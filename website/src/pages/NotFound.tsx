
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-sporting text-9xl font-bold mb-4">404</div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Página Não Encontrada</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Lamentamos, mas a página que procuras não existe ou foi movida.
        </p>
        <Button asChild className="donation-button">
          <Link to="/">Voltar à Página Inicial</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
