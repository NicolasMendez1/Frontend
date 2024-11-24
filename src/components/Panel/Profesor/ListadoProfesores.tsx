import { useState, useEffect } from 'react';
import profesorRepository from '../../../repositories/ProfesorRepository';
import { Profesor } from '../../../entities';
import HorarioProfesor from './HorarioProfesor';

export default function ListadoProfesores() {
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarProfesores = async () => {
        if (loading) {
            try {
                setLoading(true);
                const profesoresData = await profesorRepository.getAll();
                setProfesores(profesoresData);
            } catch (error) {
                console.error('Error al cargar los profesores:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarProfesores();
        profesorRepository.subscribe(cargarProfesores);
        return () => {
            profesorRepository.unsubscribe(cargarProfesores);
        };
    }, []);

    if (loading) {
        return <div>Cargando profesores...</div>;
    }



    return (
        <ul className="space-y-2">
          {profesores.map((profesor: Profesor, index: number) => (
            <li key={index} className="bg-white p-4 rounded-md shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold">{profesor.nombre} {profesor.apellidoPaterno} {profesor.apellidoMaterno}</h3>
                <p>Código: {profesor.codigo}</p>
                <p>Tipo: {profesor.esFullTime ? 'Full Time' : 'Part Time'}</p>
                {!profesor.esFullTime && profesor.bloquesDisponibles && (
                  <div>
                    <p>Bloques Disponibles:</p>
                    <HorarioProfesor disponibilidad={profesor.bloquesDisponibles} />
                  </div>
                )}
              </div>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => console.log(profesor)}
                aria-label={`Delete profesor ${profesor.nombre}`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )
}
