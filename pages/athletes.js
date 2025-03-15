// pages/athletes.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar';
import Link from 'next/link'; // Importa el componente Link de Next.js

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
      <Navbar />
      <h1>Atletas</h1>

      <div className="athletes-list">
        {athletes.length > 0 ? (
          athletes.map((athlete) => (
            <div key={athlete.id} className="athlete-item">
              <Link href={`/atletas/${athlete.id}`}>
                <img src={athlete.Imagen} alt={athlete.Nombre} />
                <h2>{athlete.Nombre}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p>No hay atletas disponibles.</p>
        )}
      </div>
    </div>
  );
}