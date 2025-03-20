// pages/athletes.js
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const athletesQuery = query(collection(db, 'Atletas'), orderBy('Nombre'));
        const querySnapshot = await getDocs(athletesQuery);
        const athletesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Athletes List:', athletesList);
        setAthletes(athletesList);
      } catch (error) {
        console.log('Error fetching athletes: ', error);
      }
    };

    fetchAthletes();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1>Atletas</h1>

      <div className="athletes-list">
        <ul>
          {athletes.map((athlete) => (
      <ul key={athlete.id} className="athlete-name"> {/* Clase CSS */}
      <Link href={`/atletas/${athlete.id}`}>{athlete.Nombre}</Link>
      </ul>
          ))}
        </ul>
      </div>
    </div>
  );
}