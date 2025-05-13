
import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Location = () => {
  const openingHours = [
    { day: 'Segunda à Sexta', hours: '7:00 - 22:00' },
    { day: 'Sábados', hours: '7:00 - 22:00' },
    { day: 'Domingos e Feriados', hours: '7:00 - 22:00' }
  ];

  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=R.+José+Plácido+de+Medeiros,+27+-+Jardim+Jamaica,+Itanhaém+-+SP,+11754-040', '_blank');
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-vfs-blue mb-4">Localização</h2>
          <div className="w-20 h-1 bg-vfs-sand mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Estamos localizados em Jardim Jamaica, Itanhaém, com fácil acesso e ambiente aconchegante
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg h-full">
              {/* Placeholder para o mapa - em produção seria um iframe do Google Maps */}
              <div className="bg-gray-300 h-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
                <Button 
                  className="bg-vfs-blue hover:bg-vfs-blue/80"
                  onClick={openGoogleMaps}
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Abrir no Google Maps
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-vfs-sand/20 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-serif font-bold text-vfs-brown mb-6">Visite-nos</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-vfs-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Endereço</h4>
                    <p className="text-gray-700">R. José Plácido de Medeiros, 27</p>
                    <p className="text-gray-700">Jardim Jamaica - Itanhaém, SP</p>
                    <p className="text-gray-700">CEP: 11754-040</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="mr-4 h-6 w-6 text-vfs-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Horário de Funcionamento</h4>
                    <ul className="space-y-1">
                      {openingHours.map((item, index) => (
                        <li key={index} className="text-gray-700">
                          <span className="font-medium">{item.day}:</span> {item.hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-vfs-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Contato</h4>
                    <p className="text-gray-700">WhatsApp: (13) 99790-7864</p>
                    <p className="text-gray-700">Email: contato@vfscastanhas.com.br</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
