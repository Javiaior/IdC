import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Import Firebase config

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Actualizaciones"));
        const updatesArray = querySnapshot.docs.map(doc => doc.data());
        setUpdates(updatesArray);
      } catch (error) {
        console.log("Error fetching updates: ", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Actualizaciones</h1>
      </header>

      <div className="updates-list">
        {updates.length === 0 ? (
          <p>No updates available.</p>
        ) : (
          updates.map((update, index) => (
            <div key={index} className="update-item">
              <h3>{update.Title}</h3>
              <p>{update.Content}</p>
              <a href={update.Link} target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
