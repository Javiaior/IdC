import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar'; // Asegúrate de importar Navbar

export default function Updates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Actualizaciones'));
        const updatesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpdates(updatesList);
      } catch (error) {
        console.log('Error fetching updates: ', error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Asegúrate de incluir el Navbar */}
      <h1>Actualizaciones</h1>
      <div>
        {updates.map((update) => (
          <div key={update.id}>
            <h2>{update.Title}</h2>
            <p>{update.Content}</p>
            <a href={update.Link} target="_blank" rel="noopener noreferrer">Leer más</a>
          </div>
        ))}
      </div>
    </div>
  );
}