
import { Clock, MapPin, Phone } from 'lucide-react';

const Location = () => {
  const openingHours = [
    { day: 'Segunda à Sexta', hours: '8:00 - 20:00' },
    { day: 'Sábados', hours: '7:00 - 22:00' },
    { day: 'Domingos e Feriados', hours: '7:00 - 22:00' }
  ];

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

        <div className="flex flex-col items-center justify-center lg:flex-row gap-8">
          <div className="hidden md:flex lg:w-1/2">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d909.5898789545262!2d-46.8656172303573!3d-24.229201475678252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d02b1d6179684b%3A0xe6df4932cbecfa84!2sVFS%20Castanhas%20e%20Doces%20Atacado%20e%20Varejo!5e0!3m2!1sen!2sbr!4v1747330691964!5m2!1sen!2sbr" width="600" height="400" loading="lazy"></iframe>
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
                  <a target='_blank' href="https://api.whatsapp.com/send?phone=5513997907864">
                  <Phone className="mr-4 h-6 w-6 text-vfs-blue flex-shrink-0 mt-1" />
                  </a>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Contato</h4>
                    <p className="text-gray-700">WhatsApp: (13) 99790-7864</p>
                    {/* <p className="text-gray-700">Email: contato@vfscastanhas.com.br</p> */}
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
