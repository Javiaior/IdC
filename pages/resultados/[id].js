// pages/resultados/[id].js
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Resultados() {
  const router = useRouter();
  const { id } = router.query;
  const [resultados, setResultados] = useState([]);
  const [eventName, setEventName] = useState('');
  const [ganadores, setGanadores] = useState({});
  const [perdedores, setPerdedores] = useState({});

  useEffect(() => {
    const fetchResultados = async () => {
      if (id) {
        try {
          const eventRef = doc(db, 'Eventos', id);
          const eventSnap = await getDoc(eventRef);
          if (eventSnap.exists()) {
            setEventName(eventSnap.data().name);

            // Obtener resultados del campo de array
            const resultadosList = eventSnap.data().Resultados || [];
            setResultados(resultadosList);

            // Obtener nombres de ganadores y perdedores
            const ganadoresPromises = resultadosList.map(async (resultado) => {
              try {
                const ganadorDoc = await getDoc(doc(db, 'Atletas', resultado.Ganador));
                return { [resultado.Ganador]: ganadorDoc.exists() ? ganadorDoc.data().Nombre : 'Atleta Desconocido' };
              } catch (error) {
                console.error('Error fetching ganador:', error);
                return { [resultado.Ganador]: 'Error' };
              }
            });

            const perdedoresPromises = resultadosList.map(async (resultado) => {
              try {
                const perdedorDoc = await getDoc(doc(db, 'Atletas', resultado.Perdedor));
                return { [resultado.Perdedor]: perdedorDoc.exists() ? perdedorDoc.data().Nombre : 'Atleta Desconocido' };
              } catch (error) {
                console.error('Error fetching perdedor:', error);
                return { [resultado.Perdedor]: 'Error' };
              }
            });

            const ganadoresData = await Promise.all(ganadoresPromises);
            const perdedoresData = await Promise.all(perdedoresPromises);

            setGanadores(Object.assign({}, ...ganadoresData));
            setPerdedores(Object.assign({}, ...perdedoresData));
          }
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
              <Link href={`/atletas/${resultado.Ganador}`}>
                {ganadores[resultado.Ganador] || 'Cargando...'}
              </Link>
              {' venció a '}
              <Link href={`/atletas/${resultado.Perdedor}`}>
                {perdedores[resultado.Perdedor] || 'Cargando...'}
              </Link>
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