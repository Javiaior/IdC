import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase'; // Import Firebase configuration

export default function Updates() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const updatesCollection = collection(db, 'Actualizaciones');
        const q = query(updatesCollection, orderBy('Date', 'desc')); // Sort by date, newest first
        const querySnapshot = await getDocs(q);

        const fetchedUpdates = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUpdates(fetchedUpdates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching updates:", error);
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="updates-page container">
      <header className="page-header">
        <h1>Actualizaciones</h1>
      </header>

      {loading ? (
        <p>Loading updates...</p>
      ) : (
        <div className="updates-list">
          {updates.map((update) => (
            <div key={update.id} className="update-card">
              <h2>{update.Title}</h2>
              <p>{update.Content}
