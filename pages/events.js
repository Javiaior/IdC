// pages/events.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar';
import Link from 'next/link';

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
          <div key={event.id} className="event-container">
            <div className="event-item">
              <div className="event-details">
                <h2>{event.Name}</h2>
                <div className="event-meta">
                  <p className="event-date">
                    {event.Dia}/{event.Mes}/{event.Año}
                  </p>
                  {event.Localizacion && (
                    <div className="event-location-time">
                      <p className="event-location">
                        Localización: {event.Localizacion}
                      </p>
                      <p className="event-time">Hora: {event.Hora}</p>
                    </div>
                  )}
                </div>
                {event.Resultados && event.Resultados.length > 0 && (
                  <Link href={`/resultados/${event.id}`}>
                    <button>Ver resultados</button>
                  </Link>
                )}
                {event.Link && (
                  <a href={event.Link} target="_blank" rel="noopener noreferrer">
                    Más información
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}