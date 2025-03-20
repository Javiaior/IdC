// pages/atletas/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function Athlete() {
  const router = useRouter();
  const { id } = router.query;
  const [athlete, setAthlete] = useState(null);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchAthlete = async () => {
      if (id) {
        try {
          let athleteDoc;

          athleteDoc = await getDoc(doc(db, 'Atletas', id));

          if (athleteDoc.exists()) {
            const athleteData = { id: athleteDoc.id, ...athleteDoc.data() };
            setAthlete(athleteData);

            if (Array.isArray(athleteData.Resultados)) {
              const eventosPromises = athleteData.Resultados.map(async (resultado) => {
                try {
                  const eventId = resultado.EventID;

                  if (eventId) {
                    const eventoDoc = await getDoc(doc(db, 'Eventos', eventId));
                    if (eventoDoc.exists()) {
                      const eventoData = { id: eventoDoc.id, ...eventoDoc.data() };

                      let oponente = 'Desconocido';
                      let resultadoTexto = '';
                      if (Array.isArray(eventoData.Resultados)) {
                        for (const r of eventoData.Resultados) {
                          if (r.Ganador === id) {
                            const oponenteDoc = await getDoc(doc(db, 'Atletas', r.Perdedor));
                            oponente = oponenteDoc.exists() ? oponenteDoc.data().Nombre : 'Desconocido';
                            resultadoTexto = <span style={{ color: 'green', fontWeight: 'bold' }}>W</span>;
                            break;
                          } else if (r.Perdedor === id) {
                            const oponenteDoc = await getDoc(doc(db, 'Atletas', r.Ganador));
                            oponente = oponenteDoc.exists() ? oponenteDoc.data().Nombre : 'Desconocido';
                            resultadoTexto = <span style={{ color: 'red', fontWeight: 'bold' }}>L</span>;
                            break;
                          }
                        }
                      }
                      return { ...eventoData, Resultado: resultadoTexto, Oponente: oponente };
                    } else {
                      console.error('Evento no encontrado:', eventId);
                      return null;
                    }
                  } else {
                    console.error('Resultado sin EventID:', resultado);
                    return null;
                  }
                } catch (error) {
                  console.error('Error fetching evento:', error);
                  return null;
                }
              });

              const eventosData = (await Promise.all(eventosPromises)).filter(Boolean);
              setEventos(eventosData);

              let victorias = 0;
              let derrotas = 0;
              eventosData.forEach(evento => {
                if (evento.Resultado.props.style.color === 'green') {
                  victorias++;
                } else if (evento.Resultado.props.style.color === 'red') {
                  derrotas++;
                }
              });
              setAthlete({ ...athleteData, victorias, derrotas });
            } else {
              console.error('Resultados no es un array:', athleteData.Resultados);
            }
          } else {
            console.log('No such athlete!');
          }
        } catch (error) {
          console.error('Error fetching athlete:', error);
        }
      }
    };

    fetchAthlete();
  }, [id]);

  if (!athlete) {
    return (
      <div>
        <Navbar />
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>{athlete.Nombre}</h1>

      {athlete.victorias !== undefined && athlete.derrotas !== undefined && (
        <div style={{ textAlign: 'center' }}>
          Record IdC: ({athlete.victorias} - {athlete.derrotas})
        </div>
      )}

      {athlete.Instagram && (
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
            Instagram: <a href={athlete.Instagram} target="_blank" rel="noopener noreferrer">
              <Image src="/images/instagram-icon.png" alt="Perfil de Instagram" width={32} height={32} />
            </a>
          </span>
        </div>
      )}

      {athlete.Imagen && <img src={athlete.Imagen} alt={athlete.Nombre} />}

      {console.log('athlete.Instagram:', athlete.Instagram)}

      <h2>Historial de Eventos</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Fecha</th>
              <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Evento</th>
              <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Resultado</th>
              <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Oponente</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => {
              const fecha = new Date(evento.Año, evento.Mes - 1, evento.Dia);
              const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

              return (
                <tr key={evento.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{fechaFormateada}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{evento.Name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{evento.Resultado}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{evento.Oponente}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}