export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <img src="https://imgur.com/fOUzY6G.png" alt="Isla del Combate Logo" className="logo" />
          <div className="text-container">
            <h1>¿Qué es Isla del Combate?</h1>
            <p>
              Isla del Combate es un proyecto cuya misión es promover y fomentar no solo las artes marciales en la isla,
              sino también sus atletas, competidores y practicantes.
            </p>
          </div>
        </div>
      </header>

      <div className="flex-container">
        <div className="updates-section">
          <h2>Mantente informado</h2>
          <p>Actualización 1: Nuevos eventos próximos.</p>
          <p>Actualización 2: Nuevos atletas se unieron al equipo.</p>
          <button>Ver más</button>
        </div>

        <div className="como-intentamos">
          <h2>¿Cómo intentamos hacerlo?</h2>

          <div className="section">
            <h2>Apoyo a atletas</h2>
            <p>
              Existen muchos atletas y practicantes en la isla que compiten dentro y fuera de la isla.
              Buscamos apoyarlos en cualquier manera que podamos.
            </p>
          </div>

          <div className="section">
            <h2>Apoyo a eventos</h2>
            <p>
              Cuando aparece una oportunidad de estar en un evento en la isla, decimos presente.
              Sea ayudando, grabando, tomando fotos, auspiciando o como espectadores, buscamos
              apoyar a los eventos y sus organizadores.
            </p>
          </div>

          <div className="section">
            <h2>Educación</h2>
            <p>
              A través de análisis de técnica y estrategias, asistiendo a seminarios y visitas,
              y apoyando eventos de compartir y aprendizaje entre atletas en la isla,
              buscamos alimentar el conocimiento de los practicantes, aumentando el conocimiento colectivo de la comunidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
