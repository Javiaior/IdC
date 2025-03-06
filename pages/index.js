export default function Home() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-6">
            ¿Qué es Isla del Combate?
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Isla del Combate es un proyecto cuya misión es promover y fomentar no solo las artes marciales en la isla, 
            sino también sus atletas, competidores y practicantes.
          </p>
  
          <h1 className="text-3xl font-bold text-blue-400 mt-8">¿Cómo intentamos hacerlo?</h1>
  
          <section className="mt-6 border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-gray-100">Apoyo a atletas</h2>
            <p className="text-lg text-gray-400">
              Existen muchos atletas y practicantes en la isla que compiten dentro y fuera de la isla. 
              Buscamos apoyarlos en cualquier manera que podamos.
            </p>
          </section>
  
          <section className="mt-6 border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-semibold text-gray-100">Apoyo a eventos</h2>
            <p className="text-lg text-gray-400">
              Cuando aparece una oportunidad de estar en un evento en la isla, decimos presente. 
              Sea ayudando, grabando, tomando fotos, auspiciando o como espectadores, buscamos 
              apoyar a los eventos y sus organizadores.
            </p>
          </section>
  
          <section className="mt-6 border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-gray-100">Educación</h2>
            <p className="text-lg text-gray-400">
              A través de análisis de técnica y estrategias, asistiendo a seminarios y visitas, 
              y apoyando eventos de compartir y aprendizaje entre atletas en la isla, 
              buscamos alimentar el conocimiento de los practicantes, aumentando el conocimiento colectivo de la comunidad.
            </p>
          </section>
        </div>
      </div>
    );
  }
  