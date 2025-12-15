const teamImage = "/assets/about-team.jpg";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-black text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFD700]/10 -skew-x-12 translate-x-1/4 z-0 hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              Sobre Nós
            </h2>

            <div className="space-y-4 md:space-y-6 text-white/80 font-light leading-relaxed text-sm md:text-base">
              <p>
                Somos uma corretora de imóveis localizada na Centralidade do Sequele, dedicada a oferecer soluções imobiliárias seguras, transparentes e de alta qualidade para os nossos clientes.
              </p>
              <p>
                A nossa atuação é baseada em transparência, confiança e compromisso, acompanhando cada cliente em todas as etapas do processo de compra, venda ou arrendamento de imóveis, com total clareza e profissionalismo.
              </p>
              <p>
                A corretora é liderada por Hilário da Silva, corretor-chefe da Angola Imobiliária, profissional com experiência no mercado imobiliário nacional, reconhecido pela sua seriedade, ética e profundo conhecimento do setor.
              </p>
              <p>
                O nosso objetivo é transformar o sonho da casa própria ou do investimento imobiliário numa experiência segura, simples e satisfatória, garantindo que cada cliente faça negócios com tranquilidade e confiança.
              </p>
            </div>

            <div className="pt-4 border-l-4 border-[#FFD700] pl-6">
              <p className="font-serif text-2xl font-medium text-white">
                Junte-se a nós e descubra por que a Angola Imobiliária é uma referência inovadora no mercado imobiliário.
              </p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="absolute inset-0 bg-[#FFD700] rounded-lg transform translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10" />
            <img
              src={teamImage}
              alt="Equipe Angola Imobiliária"
              className="w-full rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
