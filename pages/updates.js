// pages/updates.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Firebase config
import Navbar from '../components/Navbar'; // Import Navbar

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Actualizaciones"));
        const updatesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUpdates(updatesList);
      } catch (error) {
        console.log("Error fetching updates: ", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Navbar added here */}
      <h1>Actualizaciones</h1>
      <p>Aquí estarán las actualizaciones del proyecto.</p>

      <div className="updates-list">
        {updates.length > 0 ? (
          updates.map((update) => (
            <div key={update.id} className="update-item">
              <h2>{update.Title}</h2>
              <p>{update.Content}</p>
              {update.Link && (
                <a href={update.Link} target="_blank" rel="noopener noreferrer">
                  Leer más
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No hay actualizaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}