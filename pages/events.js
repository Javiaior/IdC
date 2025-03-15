// pages/events.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Eventos'));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1>Eventos</h1>

      <div className="events-list">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            {event.Image && (
              <img src={event.Image} alt={event.Name} className="event-image" />
            )}
            <div className="event-details">
              <h2>{event.Name}</h2>
              <p>
                {event.Dia}/{event.Mes}/{event.Año} - {event.Hora}
              </p>
              {event.Localizacion && <p>Localización: {event.Localizacion}</p>}
              {event.Link && (
                <a href={event.Link} target="_blank" rel="noopener noreferrer">
                  Más información
                </a>
              )}
              {event.Resultados && ( // Mostrar el botón solo si hay resultados
                <button onClick={() => alert('Mostrar resultados')}>
                  Ver resultados
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}