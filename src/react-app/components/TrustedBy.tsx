export default function TrustedBy() {
  const clients = [
    {
      name: "TechFlow Solutions",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-techflow.png"
    },
    {
      name: "GlobalVenture Corp",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-globalventure.png"
    },
    {
      name: "InnovateLab",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-innovatelab.png"
    },
    {
      name: "MarketPro",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-marketpro.png"
    },
    {
      name: "DigitalFirst",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-digitalfirst.png"
    },
    {
      name: "GrowthEdge",
      logo: "https://mocha-cdn.com/0199802e-9d4f-7614-ab21-0bfecd80f05c/client-growthedge.png"
    }
  ];

  // Duplicate the array to create seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Trusted by Leading Companies
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join the businesses that have transformed their digital presence with us
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Fade overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gray-50 dark:bg-gray-900 opacity-100 z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gray-50 dark:bg-gray-900 opacity-100 z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex animate-scroll">
            {duplicatedClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
