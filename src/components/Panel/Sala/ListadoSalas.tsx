import { useState, useEffect } from 'react';
import { salaRepository } from '../../../repositories/SalaRepository';
import { Sala } from '../../../entities/Sala';

export default function ListadoSalas() {
    const [salas, setSalas] = useState<Sala[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarSalas = async () => {
        if (loading) {
            try {
                setLoading(true);
                const salasData = await salaRepository.getAll();
                setSalas(salasData);
            } catch (error) {
                console.error('Error al cargar las salas:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarSalas();
    }, []);

    if (loading) {
        return <div>Cargando salas...</div>;
    }

    return (
        <ul className="space-y-2">
          {salas.map((sala, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold">{sala.nombre}</h3>
                <p>Código: {sala.codigo}</p>
                <p>Capacidad: {sala.capacidad}</p>
                <p>Tipo: {sala.esLaboratorio ? 'Laboratorio' : 'Aula'}</p>
              </div>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => console.log(sala)}
                aria-label={`Delete sala ${sala.nombre}`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )
} 



