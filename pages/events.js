// pages/events.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar'; // Import Navbar

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Eventos"));
        const eventsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsList);
      } catch (error) {
        console.log("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Navbar added here */}
      <h1>Eventos</h1>
      <p>Explora los próximos eventos y resultados pasados.</p>

      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-item">
              <h2>{event.Title}</h2>
              <p>{event.Description}</p>
              {event.Link && (
                <a href={event.Link} target="_blank" rel="noopener noreferrer">
                  Más información
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>
    </div>
  );
}
