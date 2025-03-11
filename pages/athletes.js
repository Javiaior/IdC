// pages/athletes.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar'; // Import Navbar

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Atletas"));
        const athletesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAthletes(athletesList);
      } catch (error) {
        console.log("Error fetching athletes: ", error);
      }
    };

    fetchAthletes();
  }, []);

  return (
    <div className="container">
      <Navbar /> {/* Navbar added here */}
      <h1>Atletas</h1>
      <p>Conoce a los atletas que forman parte de Isla del Combate.</p>

      <div className="athletes-list">
        {athletes.length > 0 ? (
          athletes.map((athlete) => (
            <div key={athlete.id} className="athlete-item">
              <h2>{athlete.Name}</h2>
              <p>{athlete.Bio}</p>
            </div>
          ))
        ) : (
          <p>No hay atletas disponibles.</p>
        )}
      </div>
    </div>
  );
}
