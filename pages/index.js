// pages/index.js
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Import Firebase config

export default function Home() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const docRef = doc(db, "Actualizaciones", "Substack");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const updateData = docSnap.data();
          setUpdates([updateData]); // Assuming you have one document, if there are more, handle accordingly
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Add the navbar component here */}

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
          {updates.slice(0, 3).map((update, index) => (
            <div key={index} className="update-item">
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

      {/* Social Media Links */}
      <div className="social-media-container">
        <h2>Encuéntranos</h2>
        <div className="social-media-icons">
          {/* Facebook Page */}
          <a href="https://www.facebook.com/profile.php?id=61563296262201" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.png" alt="Facebook Page" className="social-icon" />
          </a>

          {/* Facebook Group */}
          <a href="https://www.facebook.com/groups/914374252473778" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon-2.png" alt="Facebook Group" className="social-icon" />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram-icon.png" alt="Instagram" className="social-icon" />
          </a>

          {/* YouTube Icon */}
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/youtube-icon.png" alt="YouTube" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
