// pages/index.js
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';

export default function Home() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const updatesCollection = collection(db, 'Actualizaciones');
        const updatesQuery = query(
          updatesCollection,
          orderBy('Fecha', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(updatesQuery);
        const updatesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpdates(updatesList);
        console.log('Datos de Firebase:', updatesList); // Agregado para depuración
      } catch (error) {
        console.error('Error fetching data: ', error); // Cambiado a console.error
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <Navbar />

      <header>
        <div className="logo-container">
          <h1>¿Qué es Isla del Combate?</h1>
        </div>
        <p>
          Isla del Combate es un proyecto cuya misión es promover y fomentar no solo las artes marciales en la isla,
          sino también sus atletas, competidores y practicantes.
        </p>
      </header>

      <div className="flex-container">
        <div className="updates-section">
          <h2>Mantente informado</h2>
          {updates.map((update) => ( // Eliminado .slice(0, 3) para depurar
            <div key={update.id} className="update-item">
              <h3>{update.Title}</h3>
              <p>{update.Content}</p>
              <a href={update.Link} target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
          ))}
          <button onClick={() => window.location.href = "/updates"}>Ver más</button>
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

      <div className="social-media-container">
        <h2>Encuéntranos</h2>
        <div className="social-media-icons">
          <a href="https://www.facebook.com/profile.php?id=61563296262201" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.png" alt="Facebook Page" className="social-icon" />
          </a>
          <a href="https://www.facebook.com/groups/914374252473778" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon-2.png" alt="Facebook Group" className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram-icon.png" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/youtube-icon.png" alt="YouTube" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}