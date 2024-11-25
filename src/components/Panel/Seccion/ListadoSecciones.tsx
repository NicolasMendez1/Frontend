import { useState, useEffect } from 'react';
import seccionRepository from '../../../repositories/SeccionRepository';
import { Seccion } from '../../../entities/Seccion';


export default function ListadoSecciones() {
    const [secciones, setSecciones] = useState<Seccion[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarSecciones = async () => {
        if (loading) {
            try {
                setLoading(true);
                const seccionesData = await seccionRepository.getAll();
                console.log(seccionesData);
                setSecciones(seccionesData);
            } catch (error) {
                console.error('Error al cargar las secciones:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDelete = async (seccion: Seccion) => {
        await seccionRepository.delete(seccion.codigo, seccion.codigoCurso);
    }

    const handleSelectCatedra = (seccion: Seccion) => {
        seccionRepository.setSeccionSeleccionada(seccion, false);
    }


    const handleSelectLaboratorio = (seccion: Seccion) => {
        seccionRepository.setSeccionSeleccionada(seccion, true);
    }

    useEffect(() => {
        cargarSecciones();
        seccionRepository.subscribe(cargarSecciones);
        return () => {
            seccionRepository.unsubscribe(cargarSecciones);
        };
    }, []);

    if (loading) {
        return <div>Cargando secciones...</div>;
    }
    return (
        <ul className="space-y-2">
          {secciones.map((seccion, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow flex justify-between items-start">
              <div>
                <h3 className='font-bold'>Seccion: {seccion.codigo}</h3>
                <h3 className='font-bold'>Código Curso: {seccion.codigoCurso}</h3>
                <p>Código Profesor: {seccion.codigoProfesor}</p>
                <p>Sala Cátedra: {seccion.codigoSalaCatedra}</p>
                <p>Sala Laboratorio: {seccion.codigoSalaLaboratorio}</p>
                <p>Cantidad de Estudiantes: {seccion.cantidadDeEstudiantesSeccion}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                  onClick={() => handleSelectCatedra(seccion)}
                  aria-label={`Select section ${seccion.codigo}`}
                >
                  Agregar bloque de cátedra
                </button>
                <button
                  className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                  onClick={() => handleSelectLaboratorio(seccion)}
                  aria-label={`Select section ${seccion.codigo}`}
                >
                  Agregar bloque de laboratorio
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={() => handleDelete(seccion)}
                  aria-label={`Delete section ${seccion.codigo}`}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      );
}
