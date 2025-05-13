
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Nossa História', href: '#about' },
    { label: 'Produtos', href: '#products' },
    { label: 'Localização', href: '#location' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">
              <span className="text-vfs-light-blue">VFS</span> 
              <span className="text-vfs-sand"> Castanhas & Doces</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Saboreie nossos produtos artesanais em Itanhaém. Castanhas, doces e muito mais.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.059 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.36 1.057.419 2.227.058 1.265.07 1.645.07 4.85 0 3.204-.012 3.584-.07 4.85-.059 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.17-1.057.36-2.227.419-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.17-.059-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.17-.422-.36-1.057-.419-2.227-.058-1.266-.07-1.645-.07-4.85 0-3.204.012-3.584.07-4.85.059-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.17 1.057-.36 2.227-.419 1.266-.058 1.645-.07 4.85-.07zm0 2.445c-3.157 0-3.508.014-4.739.07-1.143.052-1.764.243-2.178.402-.547.213-.937.466-1.348.877-.41.41-.664.8-.877 1.348-.159.414-.35 1.035-.402 2.178-.056 1.231-.07 1.582-.07 4.739s.014 3.508.07 4.739c.052 1.143.243 1.764.402 2.178.213.547.466.937.877 1.348.41.41.8.664 1.348.877.414.159 1.035.35 2.178.402 1.231.056 1.582.07 4.739.07s3.508-.014 4.739-.07c1.143-.052 1.764-.243 2.178-.402.547-.213.937-.466 1.348-.877.41-.41.664-.8.877-1.348.159-.414.35-1.035.402-2.178.056-1.231.07-1.582.07-4.739s-.014-3.508-.07-4.739c-.052-1.143-.243-1.764-.402-2.178-.213-.547-.466-.937-.877-1.348-.41-.41-.8-.664-1.348-.877-.414-.159-1.035-.35-2.178-.402-1.231-.056-1.582-.07-4.739-.07zm0 4.162c3.305 0 5.984 2.679 5.984 5.984s-2.679 5.984-5.984 5.984-5.984-2.679-5.984-5.984 2.679-5.984 5.984-5.984zm0 9.868c2.144 0 3.884-1.74 3.884-3.884s-1.74-3.884-3.884-3.884-3.884 1.74-3.884 3.884 1.74 3.884 3.884 3.884zm7.622-10.121c0 .774-.629 1.402-1.403 1.402-.774 0-1.402-.629-1.402-1.402 0-.774.628-1.403 1.402-1.403.774 0 1.403.629 1.403 1.403z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.477-.1.883zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-medium mb-6">Horário de Funcionamento</h4>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-400">Segunda à Sexta</span>
                <span>7:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Sábados</span>
                <span>7:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-400">Domingos e Feriados</span>
                <span>7:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} VFS Castanhas e Doces. Todos os direitos reservados.
          </p>
          
          <p className="text-gray-500 flex items-center mt-4 md:mt-0">
            Feito com <Heart className="h-4 w-4 mx-1 text-red-500" /> em Itanhaém, SP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
