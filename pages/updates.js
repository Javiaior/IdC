// pages/updates.js
import Navbar from '../components/Navbar'; // Import the Navbar component
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Import Firebase config

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Actualizaciones"));
        const updatesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUpdates(updatesArray);
      } catch (error) {
        console.log("Error fetching updates: ", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Add the navbar component here */}
      <h1>Actualizaciones</h1>
      <div className="updates-list">
        {updates.map((update) => (
          <div key={update.id} className="update-item">
            <h3>{update.Title}</h3>
            <p>{update.Content}</p>
            {update.Link && <a href={update.Link} target="_blank" rel="noopener noreferrer">Leer más</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
