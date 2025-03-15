// pages/resultados/[id].js
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function Resultados() {
  const router = useRouter();
  const { id } = router.query;
  const [resultados, setResultados] = useState([]);
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    const fetchResultados = async () => {
      if (id) {
        try {
          const eventRef = doc(db, 'Eventos', id);
          const eventSnap = await getDoc(eventRef);
          if (eventSnap.exists()) {
            setEventName(eventSnap.data().Name);
          }

          const resultadosSnapshot = await getDocs(collection(db, 'Eventos', id, 'Resultados'));
          const resultadosList = resultadosSnapshot.docs.map((doc) => doc.data());
          setResultados(resultadosList);
        } catch (error) {
          console.error('Error fetching resultados: ', error);
        }
      }
    };

    fetchResultados();
  }, [id]);

  return (
    <div className="container">
      <Navbar />
      <h1>Resultados de {eventName}</h1>
      {resultados.length > 0 ? (
        <ul>
          {resultados.map((resultado, index) => (
            <li key={index}>
              {resultado.Ganador} venció a {resultado.Perdedor}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay resultados disponibles.</p>
      )}
      <p>
        No siempre se tendrán resultados de todos los combates. Si hay información que falta, favor de enviarnosla para incluirla.
      </p>
    </div>
  );
  
}

